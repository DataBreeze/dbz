import fetch from 'isomorphic-fetch';
import { msgShow } from './userActions';
import { isServerSide } from '../dbz/fbLib';

require('es6-promise').polyfill();

export const SET_SOURCE = 'SET_SOURCE';
export const INIT_SOURCE = 'INIT_SOURCE';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const RECEIVE_DATA_ONE = 'RECEIVE_DATA_ONE';
export const REQUEST_DATA = 'REQUEST_DATA';
export const REQUEST_DATA_ONE = 'REQUEST_DATA_ONE';

export const UPDATE_SOURCE = 'UPDATE_SOURCE';
export const UPDATE_LIST_VIEW = 'UPDATE_LIST_VIEW';
export const UPDATE_OFFSET = 'UPDATE_OFFSET';
export const UPDATE_SEARCH = 'UPDATE_SEARCH';
export const LOAD_RECORDS_START = 'LOAD_RECORDS_START';
export const LOAD_RECORDS_STOP = 'LOAD_RECORDS_STOP';
export const DETAIL_MSG_SET = 'DETAIL_MSG_SET';
export const DETAIL_MSG_CLEAR = 'DETAIL_MSG_CLEAR';
export const COMPONENT_UPDATED = 'COMPONENT_UPDATED';
export const LOAD_RECORD_START = 'LOAD_RECORD_START';
export const LOAD_RECORD_STOP = 'LOAD_RECORD_STOP';
export const UPDATE_RECORD_START = 'UPDATE_RECORD_START';
export const UPDATE_RECORD_STOP = 'UPDATE_RECORD_STOP';
export const UPDATE_MSG_SET = 'UPDATE_MSG_SET';
export const UPDATE_MSG_CLEAR = 'UPDATE_MSG_CLEAR';
export const NEW_RECORD_START = 'NEW_RECORD_START';
export const NEW_RECORD_STOP = 'NEW_RECORD_STOP';
export const NEW_ERROR_CLEAR = 'NEW_ERROR_CLEAR';
export const DELETE_RECORD_START = 'DELETE_RECORD_START';
export const DELETE_RECORD_STOP = 'DELETE_RECORD_STOP';
export const DELETE_CHILD_RECORD_START = 'DELETE_RECORD_START';
export const DELETE_CHILD_RECORD_STOP = 'DELETE_RECORD_STOP';
export const DELETE_CONFIRM = 'DELETE_CONFIRM';
export const DELETE_CONFIRM_YES = 'DELETE_CONFIRM_YES';
export const DELETE_CONFIRM_NO = 'DELETE_CONFIRM_NO';
export const UPLOAD_PHOTO_START = 'UPLOAD_PHOTO_START';
export const UPLOAD_PHOTO_STOP = 'UPLOAD_PHOTO_STOP';
export const SET_NEW_UPLOAD = 'SET_NEW_UPLOAD';
export const CONFIRM_SHOW = 'CONFIRM_SHOW';
export const PHOTOS_SHOW = 'PHOTOS_SHOW';
export const PHOTO_EDIT_SHOW = 'PHOTO_EDIT_SHOW';
export const PHOTO_EDIT_HIDE = 'PHOTO_EDIT_HIDE';

const CACHE_LIMIT = 5;

export function updateOffset(p) {
  const offset = parseInt(p.offset || 0, 10);
  return {
    type: UPDATE_OFFSET,
    source: p.source,
    offset,
    dirtyList: true,
  };
}

export function updateSource(p) {
  return {
    type: UPDATE_SOURCE,
    source: p.source,
    needsRender: true,
  };
}

export function updateListView(p) {
  return {
    type: UPDATE_LIST_VIEW,
    source: p.source,
    listView: p.listView,
    needsRender: p.needsRender,
  };
}

export function updateSearch(p) {
  return {
    type: UPDATE_SEARCH,
    source: p.source,
    search: p.search,
    dirtyList: true,
  };
}

export function getStats(state) {
  return state.source.sources.current.stats;
}

export function getRecords(state) {
  let records = state.source.sources.current.records;
  if (records === undefined) {
    records = [];
  }
  return records;
}

export function getRecord(state) {
  let rec = state.source.sources.current.record;
  if (rec === undefined) {
    rec = false;
  }
  return rec;
}
export function getNewUpload(state) {
  return state.source.sources.current.newUpload;
}
export function setNewUpload(p) {
  return {
    type: SET_NEW_UPLOAD,
    source: p.source,
    newUpload: p.newUpload,
  };
}

export function componentUpdated(p) {
  return {
    type: COMPONENT_UPDATED,
    source: p.source,
    refetch: false,
    isFetching: false,
    newData: false,
    needsRender: false,
  };
}
function currentRecordsOK(state) {
  if (!state.dirtyList) {
    if ((state.records !== undefined) && (state.records.length > 0)) {
      if (state.fetchTS) {
        const diffSec = (Date.now() - state.fetchTS) / 1000;
        if (diffSec < CACHE_LIMIT) {
// console.log('CACHE GOOD ! - no refetch (', diffSec, ')');
          return true;
        }
      }
    }
  }
  return false;
}
function loadRecordsStart(p) {
  return {
    type: LOAD_RECORDS_START,
    source: p.source,
    isFetching: true,
    newData: false,
  };
}

function loadRecordsStop(p) {
  const stats = Object.assign({}, p.data);
  delete stats.records;
  return {
    stats,
    type: LOAD_RECORDS_STOP,
    source: p.source,
    records: p.data.records,
    refetch: false,
    isFetching: false,
    needsRender: true,
    newData: false,
    dirtyList: false,
    fetchTS: Date.now(),
  };
}
function fetchRecords(p) {
  return (dispatch, callState) => {
    const state = callState();
    const cs = state.source.sources.current;
    const source = p.source || cs.source;
    const search = cs.search;
    const offset = cs.offset;
    const cfg = state.app.cfg.fetch;
    let url = `${cfg.apiHost}${cfg.apiSourcePath}${source}`;
    if (search) {
      const encodedSearch = encodeURIComponent(search);
      url += `/s/${encodedSearch}`;
    }
    if (offset && (offset > 0)) {
      url += `?offset=${offset}`;
    }
    const opts = { credentials: 'include' };
    if (isServerSide) {
      const token = state.user.token;
      if (token) {
        opts.headers = { Accept: 'application/json', 'Content-Type': 'application/json', Cookie: `token=${token}` };
      }
    }
    dispatch(loadRecordsStart({ source }));
    return fetch(url, opts).then(response => response.json()).then(data2 => dispatch(loadRecordsStop({ source, data: data2 })));
  };
}
export function loadRecords(p) {
  return (dispatch, callState) => {
    const state = callState().source.sources.current;
    if (state.isFetching) {
      return state;
    } else if ((!p.force) && currentRecordsOK(state)) {
      return state;
    }
    return dispatch(fetchRecords(p));
  };
}

function loadRecordStart(p) {
  return {
    type: LOAD_RECORD_START,
    source: p.source,
    isFetching: true,
    newData: false,
  };
}

function loadRecordStop(p) {
  const data = p.data;
  const stat = Object.assign({}, p.data);
  delete stat.record;
  const newData = {
    type: LOAD_RECORD_STOP,
    source: p.source,
    record: {},
    refetch: false,
    isFetching: false,
    needsRender: false,
    newData: false,
    dirtyOne: false,
    fetchTS: Date.now(),
  };
  if (data.error) {
    newData.detailMsg = data.detail;
    newData.detailMsgType = 'warning';
  } else {
    newData.record = data.record;
    newData.stat = stat;
    newData.needsRender = true;
  }
  return newData;
}
function fetchRecord(p) {
  return (dispatch, callState) => {
    const source = p.source;
    const state = callState();
    const cfg = state.app.cfg.fetch;
    const url = `${cfg.apiHost}${cfg.apiSourcePath}${source}/${p.id}`;
    dispatch(loadRecordStart({ source }));
    const opts = { credentials: 'include' };
    if (isServerSide) {
      const token = state.user.token;
      if (token) {
        opts.headers = { Accept: 'application/json', 'Content-Type': 'application/json', Cookie: `token=${token}` };
      }
    }
    return fetch(url, opts).then(response => response.json()).then(data2 => dispatch(loadRecordStop({ source, data: data2 })));
  };
}

export function loadRecord(p) {
  return (dispatch, callState) => {
    const state = callState().source.sources.current;
    if (!state.isFetching) {
      return dispatch(fetchRecord(p));
    }
    return state;
  };
}

export function detailMsgSet(p) {
  return {
    type: DETAIL_MSG_SET,
    detailMsg: p.msg,
    detailMsgType: p.type,
  };
}

export function detailMsgClear() {
  return {
    type: DETAIL_MSG_CLEAR,
    detailMsg: null,
    detailMsgType: null,
  };
}

function updateRecordStart(p) {
  return {
    type: UPDATE_RECORD_START,
    source: p.source,
    isUpdating: true,
    newData: false,
  };
}

function updateRecordStop(dispatch, p) {
  const data = p.data;
  const stat = Object.assign({}, data);
  delete stat.record;
  const newData = {
    type: UPDATE_RECORD_STOP,
    source: p.source,
    refetch: false,
    isUpdating: false,
    needsRender: false,
    newData: false,
    dirtyOne: false,
    dirtyList: false,
    fetchTS: Date.now(),
  };
  if (data.error) {
    newData.updateMsg = data.detail;
    newData.updateMsgType = 'warning';
  } else {
    newData.record = data.record;
    newData.stat = stat;
    newData.needsRender = true;
    newData.newData = true;
    newData.dirtyList = true;
    newData.updateMsg = data.detail;
    newData.updateMsgType = 'success';
  }
  return newData;
}

function updateRecord(p) {
  return (dispatch, callState) => {
    const source = p.source;
    const state = callState();
    const cfg = state.app.cfg.fetch;
    const url = `${cfg.apiHost}${cfg.apiSourcePath}${source}/e/${p.id}`;
    dispatch(updateRecordStart({ source }));
    const data = new FormData();
    Object.keys(p.updates).forEach(key => data.append(key, p.updates[key] || ''));
    const opts = { method: 'post', body: data, credentials: 'include' };
    return fetch(url, opts).then(response => response.json()).then(data2 => dispatch(updateRecordStop(dispatch, { source, data: data2 })));
  };
}

export function initUpdateRecord(p) {
  return (dispatch, callState) => {
    const state = callState().source.sources.current;
    if (!state.isUpdating) {
      return dispatch(updateRecord(p));
    }
    return state;
  };
}

export function updateMsgSet(p) {
  return {
    type: UPDATE_MSG_SET,
    updateMsg: p.msg,
    updateMsgType: p.type,
  };
}

export function updateMsgClear() {
  return {
    type: UPDATE_MSG_CLEAR,
    updateMsg: null,
    updateMsgType: null,
  };
}

function newRecordStart(p) {
  return {
    type: NEW_RECORD_START,
    source: p.source,
    isCreating: true,
    newData: false,
    newId: false,
  };
}

function newRecordStop(dispatch, p) {
  const data = p.data;
  const stat = Object.assign({}, data);
  delete stat.record;
  const newState = {
    type: NEW_RECORD_STOP,
    source: p.source,
    record: {},
    newId: false,
    stat: {},
    refetch: false,
    isCreating: false,
    needsRender: false,
    newData: false,
    dirtyOne: false,
    dirtyList: true,
    fetchTS: Date.now(),
  };
  if (data.error) {
    newState.errorNew = true;
    newState.errorNewMsg = data.detail;
  } else {
    newState.newData = true;
    newState.needsRender = true;
    newState.record = data.record;
    newState.newId = data.record.id;
    newState.status = status;
  }
  return newState;
}

function newRecord(p) {
  return (dispatch, callState) => {
    const source = p.source;
    const state = callState();
    const cfg = state.app.cfg.fetch;
    const url = `${cfg.apiHost}${cfg.apiSourcePath}${source}/n/`;
    dispatch(newRecordStart({ source }));
    const data = new FormData();
    Object.keys(p.updates).forEach(key => data.append(key, p.updates[key] || ''));
    const opts = { method: 'post', body: data, credentials: 'include' };
    return fetch(url, opts).then(response => response.json()).then(data2 => dispatch(newRecordStop(dispatch, { source, data: data2 })));
  };
}

export function newErrorClear() {
  return {
    type: NEW_ERROR_CLEAR,
    errorNew: false,
    errorMsg: null,
  };
}

export function initNewRecord(p) {
  return (dispatch, callState) => {
    const state = callState().source.sources.current;
    if (!state.isCreating) {
      return dispatch(newRecord(p));
    }
    return state;
  };
}

export function getNewId(state) {
  return state.source.sources.current.newId;
}

function deleteRecordStart(p) {
  return {
    type: DELETE_RECORD_START,
    source: p.source,
    isDeleting: true,
    confirmMsg: null,
    confirmShow: false,
    confirmSource: null,
    confirmId: null,
  };
}

function deleteRecordStop(dispatch, p) {
  const data = p.data;
  const stat = Object.assign({}, data);
  delete stat.record;
  const newData = {
    type: DELETE_RECORD_STOP,
    source: p.source,
    refetch: false,
    isDeleting: false,
    needsRender: false,
    newData: false,
    dirtyOne: false,
    dirtyList: false,
    fetchTS: Date.now(),
  };
  if (data.error) {
    newData.updateMsg = data.detail;
    newData.updateMsgType = 'warning';
  } else {
    newData.record = {};
    newData.stat = {};
    newData.needsRender = true;
    newData.deleted = true;
    newData.dirtyList = true;
  }
  return newData;
}

function deleteRecord(p) {
  return (dispatch, callState) => {
    const source = p.source;
    const state = callState();
    const cfg = state.app.cfg.fetch;
    const url = `${cfg.apiHost}${cfg.apiSourcePath}${source}/d/${p.id}`;
    dispatch(deleteRecordStart({ source }));
    const opts = { method: 'get', credentials: 'include' };
    return fetch(url, opts).then(response => response.json()).then(data2 => dispatch(deleteRecordStop(dispatch, { source, data: data2 })));
  };
}

export function initDeleteRecord(p) {
  return dispatch => dispatch(deleteRecord(p));
}

export function confirmDeleteRecord(p) {
  return {
    type: DELETE_CONFIRM,
    confirmMsg: p.msg || 'Are You sure You want to delete this record?',
    confirmShow: true,
    confirmSource: p.source,
    confirmId: p.id,
    confirmIsChild: p.isChild || false,
  };
}

function deleteChildRecordStart(p) {
  return {
    type: DELETE_CHILD_RECORD_START,
    childSource: p.source,
    isDeleting: true,
    confirmMsg: null,
    confirmShow: false,
    confirmSource: null,
    confirmId: null,
  };
}

function deleteChildRecordStop(dispatch, p) {
  const data = p.data;
  const stat = Object.assign({}, data);
  delete stat.record;
  const newData = {
    type: DELETE_CHILD_RECORD_STOP,
    childSource: p.source,
    refetch: false,
    isDeleting: false,
    needsRender: false,
    newData: false,
    dirtyOne: false,
    dirtyList: false,
    fetchTS: Date.now(),
  };
  if (data.error) {
    newData.detailMsg = data.detail;
    newData.detailMsgType = 'warning';
  } else {
    newData.refetch = true;
    newData.dirtyOne = true;
  }
  return newData;
}

function deleteChildRecord(p) {
  return (dispatch, callState) => {
    const source = p.source;
    const state = callState();
    const cfg = state.app.cfg.fetch;
    const url = `${cfg.apiHost}${cfg.apiSourcePath}${source}/d/${p.id}`;
    dispatch(deleteChildRecordStart({ source }));
    const opts = { method: 'get', credentials: 'include' };
    return fetch(url, opts).then(response => response.json()).then(data2 => dispatch(deleteChildRecordStop(dispatch, { source, data: data2 })));
  };
}

export function confirmDeleteYes() {
  return (dispatch, callState) => {
    const state = callState().source.sources.current;
    if (state.confirmSource && state.confirmId) {
      if (state.confirmIsChild) {
        return dispatch(deleteChildRecord({ source: state.confirmSource, id: state.confirmId }));
      }
      return dispatch(initDeleteRecord({ source: state.confirmSource, id: state.confirmId }));
    }
    return state;
  };
}

export function confirmDeleteNo() {
  return {
    type: DELETE_CONFIRM_NO,
    confirmMsg: null,
    confirmShow: false,
    confirmSource: null,
    confirmId: null,
    confirmIsChild: null,
  };
}

function uploadPhotoStart(p) {
  return {
    type: UPLOAD_PHOTO_START,
    source: p.source,
    isUploading: true,
    newUpload: false,
    newId: false,
    showUploadModal: true,
  };
}

function uploadPhotoStop(dispatch, p) {
  const data = p.data;
  const stat = Object.assign({}, p.data);
  delete stat.record;
  const newData = {
    type: UPLOAD_PHOTO_STOP,
    source: data.source,
    refetch: false,
    isUploading: false,
    needsRender: false,
    newData: false,
    newUpload: false,
    dirtyOne: false,
    dirtyList: false,
    fetchTS: Date.now(),
    newId: false,
    showUploadModal: false,
  };
  if (data.error) {
    dispatch(msgShow({ msgShow: true, msg: data.detail }));
  } else {
    newData.record = data.record;
    newData.stat = stat;
    newData.needsRender = true;
    newData.newData = true;
    newData.newUpload = true;
    newData.dirtyList = true;
    newData.newId = data.record.id;
  }
  return newData;
}

function uploadPhoto(p) {
  return (dispatch, callState) => {
    const state = callState();
    if (p.files && p.files.length > 0) {
      const source = p.source;
      const cfg = state.app.cfg.fetch;
      let url = `${cfg.apiHost}${cfg.apiSourcePath}${source}/u/`;
      const data = new FormData();
      p.files.forEach(file => data.append('photo', file));
      if (p.pid) {
        data.append('pid', p.pid);
        url += p.pid;
      }
      if (p.title) {
        data.append('title', p.title);
      }
      if (p.content) {
        data.append('content', p.content);
      }
      dispatch(uploadPhotoStart({ source }));
      const opts = { method: 'post', body: data, credentials: 'include' };
      return fetch(url, opts).then(response => response.json()).then((data2) => { dispatch(uploadPhotoStop(dispatch, { source, data: data2 })); });
    }
    return state;
  };
}

// START CONFIRM
export function confirmShow(p) {
  return {
    type: CONFIRM_SHOW,
    confirmMsg: p.msg,
    confirmShow: p.confirmShow,
  };
}
// END CONFIRM

// START Photos modal
export function photosShow(p) {
  return {
    type: PHOTOS_SHOW,
    photosShow: p.show,
    photos: p.photos || null,
    photoId: p.photoId || null,
  };
}

export function photosHide() {
  return {
    type: PHOTOS_SHOW,
    photosShow: false,
    photos: null,
    photoId: null,
  };
}
// END PHOTOS

// START Photo Edit modal
export function photoEditShow(p) {
  return {
    type: PHOTO_EDIT_SHOW,
    photoEditShow: true,
    photoId: p.photoId || null,
  };
}

export function photoEditHide() {
  return {
    type: PHOTO_EDIT_HIDE,
    photoEditShow: false,
    photoId: null,
  };
}
// END PHOTO EDIT

export function initUploadPhoto(p) {
  return (dispatch, callState) => {
    const state = callState().source.sources.current;
    if (!state.isUploading) {
      return dispatch(uploadPhoto(p));
    }
    return state;
  };
}

export function getState() {
  // This “return a function” form is supported thanks to redux-thunk
  return (dispatch, callState) => callState();
}
export function getCurrentState() {
  return (dispatch, callState) => {
    const state = callState().source.sources.current;
    return state;
  };
}
export function showUploadModal(state) {
  return state.source.sources.current.showUploadModal || false;
}
