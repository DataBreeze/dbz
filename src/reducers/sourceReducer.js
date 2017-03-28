import * as Act from '../actions/sourceActions';
import initialState from '../initialState';

function sourceReducer(sourceState = initialState.source, action) {
  const sourcesState = sourceState.sources;
  const { type, ...newState } = action;
  const curSource = newState.source || sourceState.sources.current.source;
  const oldState = (sourcesState[curSource] || {});
  const mergedSource = { ...oldState, ...newState };
  const mergedSources = { ...sourcesState, current: mergedSource, [curSource]: mergedSource };
  const mergedTopSource = { sources: mergedSources };
  const finalState = { ...sourceState, ...mergedTopSource };
  switch (type) {
    case Act.UPDATE_LIST_VIEW:
      if (newState.listView !== oldState.listView) {
        return finalState;
      }
      break;
    case Act.UPDATE_OFFSET:
      if (newState.offset !== oldState.offset) {
        return finalState;
      }
      break;
    case Act.UPDATE_SEARCH:
      if (newState.search !== oldState.search) {
        return finalState;
      }
      break;
    case Act.UPDATE_NEW_DATA:
      if (newState.newdata !== oldState.newData) {
        return finalState;
      }
      break;
    case Act.UPDATE_SOURCE:
    case Act.LOAD_RECORDS_START:
    case Act.LOAD_RECORDS_STOP:
    case Act.LOAD_RECORD_START:
    case Act.LOAD_RECORD_STOP:
    case Act.DETAIL_MSG_SET:
    case Act.DETAIL_MSG_CLEAR:
    case Act.UPDATE_RECORD_START:
    case Act.UPDATE_RECORD_STOP:
    case Act.UPDATE_MSG_SET:
    case Act.UPDATE_MSG_CLEAR:
    case Act.NEW_RECORD_START:
    case Act.NEW_RECORD_STOP:
    case Act.NEW_ERROR_CLEAR:
    case Act.DELETE_RECORD_START:
    case Act.DELETE_RECORD_STOP:
    case Act.DELETE_CHILD_RECORD_START:
    case Act.DELETE_CHILD_RECORD_STOP:
    case Act.DELETE_CONFIRM:
    case Act.DELETE_CONFIRM_YES:
    case Act.DELETE_CONFIRM_NO:
    case Act.UPLOAD_PHOTO_START:
    case Act.UPLOAD_PHOTO_STOP:
    case Act.SET_NEW_UPLOAD:
    case Act.COMPONENT_UPDATED:
    case Act.CONFIRM_SHOW:
    case Act.PHOTOS_SHOW:
    case Act.PHOTO_EDIT_SHOW:
    case Act.PHOTO_EDIT_HIDE:
      return finalState;
    default:
      return sourceState;
  }
  return sourceState;
}

export default sourceReducer;
