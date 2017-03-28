import fetch from 'isomorphic-fetch';
// require('es6-promise').polyfill();
import FormData from 'form-data';
import { isServerSide } from '../lib/fbLib';

export const INIT_USER = 'INIT_USER';

export const LOGIN_SHOW = 'LOGIN_SHOW';
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_STOP = 'LOGIN_STOP';
export const LOGIN_ALERT = 'LOGIN_ALERT';

export const PASSWORD_SHOW = 'PASSWORD_SHOW';
export const PASSWORD_ALERT = 'PASSWORD_ALERT';
export const PASSWORD_START = 'PASSWORD_START';
export const PASSWORD_STOP = 'PASSWORD_STOP';

export const LOGOUT_START = 'LOGOUT_START';
export const LOGOUT_STOP = 'LOGOUT_STOP';

export const ACCOUNT_NEW_SHOW = 'ACCOUNT_NEW_SHOW';
export const ACCOUNT_NEW_ALERT = 'ACCOUNT_NEW_ALERT';
export const ACCOUNT_NEW_START = 'ACCOUNT_NEW_START';
export const ACCOUNT_NEW_STOP = 'ACCOUNT_NEW_STOP';

export const ACCOUNT_SHOW = 'ACCOUNT_SHOW';
export const ACCOUNT_ALERT = 'ACCOUNT_ALERT';
export const ACCOUNT_START = 'ACCOUNT_START';
export const ACCOUNT_STOP = 'ACCOUNT_STOP';

export const RESET_SHOW = 'RESET_SHOW';
export const RESET_ALERT = 'RESET_ALERT';
export const RESET_START = 'RESET_START';
export const RESET_STOP = 'RESET_STOP';

export const RESTORE_START = 'RESTORE_START';
export const RESTORE_STOP = 'RESTORE_STOP';

export const PASSWORD_RESET_SHOW = 'PASSWORD_RESET_SHOW';
export const PASSWORD_RESET_ALERT = 'PASSWORD_RESET_ALERT';
export const PASSWORD_RESET_START = 'PASSWORD_RESET_START';
export const PASSWORD_RESET_STOP = 'PASSWORD_RESET_STOP';

export const MSG_SHOW = 'MSG_SHOW';

// LOGIN
export function loginShow(show) {
  return {
    type: LOGIN_SHOW,
    loginShow: show,
    loginAlert: null,
  };
}

export function loginAlert(alert) {
  return {
    type: LOGIN_ALERT,
    loginAlert: alert,
    loginShow: true,
  };
}

function loginStart() {
  return {
    type: LOGIN_START,
    isLoggingIn: true,
  };
}

function loginStop(p) {
  const data = p.data;
  const user = { username: 'Guest', userId: 'guest', validated: false };
  const newState = {
    type: LOGIN_STOP,
    user,
    username: 'Guest',
    loginAlert: null,
    validated: false,
    isLoggingIn: false,
    loginShow: false,
    fetchTS: Date.now(),
  };
  if (data && data.validated === true) {
    localStorage.setItem('userId', data.user.id);
    localStorage.setItem('username', data.user.username);
    localStorage.setItem('guide', data.user.guide);
    localStorage.setItem('admin', data.user.admin);
    newState.validated = data.validated;
    newState.user.validated = data.validated;
    newState.user = data.user;
  } else {
    newState.loginAlert = data.detail;
    newState.loginShow = true;
  }
  return newState;
}

function login(p) {
  return (dispatch, getState) => {
    const state = getState();
    const cfg = state.app.cfg.fetch;
    const url = `${cfg.apiHost}${cfg.apiUserPath}login`;
    dispatch(loginStart(p));
    const data = new FormData();
    if (p.username) {
      data.append('username', p.username);
    }
    if (p.password) {
      data.append('password', p.password);
    }
    return fetch(url, { method: 'post', body: data, credentials: 'include' }).then(response => response.json()).then(data2 => dispatch(loginStop({ data: data2 })));
  };
}
export function loginInit(p) {
  return (dispatch, getState) => {
    const state = getState();
    let alert = false;
    if ((!p.username) || (!p.password)) {
      if (!p.username) {
        alert = 'Please enter a username';
      } else if (!p.password) {
        alert = 'Please enter a password';
      }
      return dispatch(loginAlert(alert));
    } else if (state.user.validated || state.user.isLoggingIn) {
//      console.log('STATUS: Already Logged in:', state.user);
      return state;
    }
    return dispatch(login(p));
  };
}

// LOGIN STOP


// LOGOUT START
function logoutStart() {
  return {
    type: LOGOUT_START,
    isLoggingOut: true,
  };
}

function logoutStop(p) {
  const data = p.data;
  return {
    type: LOGOUT_STOP,
    user: data.user,
    isLoggingOut: false,
    validated: false,
    fetchTS: Date.now(),
  };
}
function logout() {
  return (dispatch, getState) => {
    const state = getState();
    const cfg = state.app.cfg.fetch;
    const url = `${cfg.apiHost}${cfg.apiUserPath}logout`;
    const opts = { credentials: 'include' };
    dispatch(logoutStart());
    return fetch(url, opts).then(response => response.json()).then(data => dispatch(logoutStop({ data })));
  };
}
export function logoutInit(p) {
  return (dispatch, getState) => {
    const state = getState().user;
    if (!state.validated || state.isLoggingOut) {
//      console.log('STATUS: Not logged in (logout)');
      return state;
    }
    return dispatch(logout(p));
  };
}

// LOGOUT STOP

// RESTORE USER - initialize user done server side at first access or reload
// validate a token server side

function restoreStart() {
  return {
    type: RESTORE_START,
    isValidating: true,
  };
}

function restoreStop(p) {
  const data = p.data;
  return {
    type: RESTORE_STOP,
    userInit: true,
    user: data.user,
    isRestoring: false,
    validated: data.validated,
    fetchTS: Date.now(),
  };
}
export function restoreUser(p) {
  return (dispatch, getState) => {
    const state = getState();
    const cfg = state.app.cfg.fetch;
    const url = `${cfg.apiHost}${cfg.apiUserPath}restoreUser`;
    dispatch(restoreStart(p));
    const opts = { method: 'post', credentials: 'include' };
    if (isServerSide) {
      const token = state.user.token;
      if (token) {
        opts.headers = { Accept: 'application/json', 'Content-Type': 'application/json', Cookie: `token=${token}` };
      }
    }
    return fetch(url, opts).then(response => response.json()).then(data => dispatch(restoreStop({ data })));
  };
}
export function restoreUserInit(p) {
  return (dispatch, getState) => {
    const state = getState().user;
    if (state.validated || state.isRestoring) {
      return state;
    }
    return dispatch(restoreUser(p));
  };
}
// END RESTORE


// ACCOUNT EDIT
export function accountShow(show) {
  return {
    type: ACCOUNT_SHOW,
    accountShow: show,
    accountAlert: null,
  };
}
function accountEditStart() {
  return {
    type: ACCOUNT_START,
    isEditing: true,
  };
}

function accountEditStop(p) {
  const data = p.data;
  const newState = {
    type: ACCOUNT_STOP,
    isEditing: false,
    validated: data.validated,
    accountAlert: null,
    accountShow: false,
    fetchTS: Date.now(),
  };
  if (data.error) {
    newState.accountAlert = data.detail;
    newState.accountShow = true;
  } else {
    newState.user = data.user;
  }
  return newState;
}
function accountEdit(p) {
  return (dispatch, getState) => {
    const state = getState();
    const cfg = state.app.cfg.fetch;
    const url = `${cfg.apiHost}${cfg.apiUserPath}edit`;
    dispatch(accountEditStart());
    const data = new FormData();
    Object.keys(p).forEach(key => data.append(key, p[key]));
    return fetch(url, { method: 'post', body: data, credentials: 'include' }).then(response => response.json()).then(data2 => dispatch(accountEditStop({ data: data2 })));
  };
}

export function accountEditInit(p) {
  return (dispatch, getState) => {
    const uState = getState().user;
    if (!uState.validated || uState.isEditing) {
      // console.log('STATUS [edit account]: Not logged in !');
      return uState;
    }
    return dispatch(accountEdit(p));
  };
}
//  ////////////////////////////

// PASSWORD EDIT
export function passwordShow(show) {
  return {
    type: PASSWORD_SHOW,
    passwordShow: show,
    passwordAlert: null,
  };
}

function passwordAlert(alert) {
  return {
    type: PASSWORD_ALERT,
    passwordAlert: alert,
    passwordShow: true,
  };
}

function passwordStart() {
  return {
    type: PASSWORD_START,
    isEditingPassword: true,
  };
}

function passwordStop(p) {
  const data = p.data;
  let alert = null;
  let show = false;
  if (data.error) {
    alert = data.detail;
    show = true;
  }
  return {
    type: PASSWORD_STOP,
    isEditingPassword: false,
    validated: data.validated,
    passwordAlert: alert,
    passwordShow: show,
    fetchTS: Date.now(),
  };
}
function password(p) {
  return (dispatch, getState) => {
    const state = getState();
    const cfg = state.app.cfg.fetch;
    const url = `${cfg.apiHost}${cfg.apiUserPath}editPassword`;
    dispatch(passwordStart());
    const data = new FormData();
    data.append('password', p.password);
    return fetch(url, { method: 'post', body: data, credentials: 'include' }).then(response => response.json()).then(data2 => dispatch(passwordStop({ data: data2 })));
  };
}

export function passwordInit(p) {
  return (dispatch, getState) => {
    const uState = getState().user;
    if (!uState.validated || uState.isEditingPassword) {
      // console.log('STATUS [edit account]: Not logged in !');
      return uState;
    } else if (!p.password) {
      return dispatch(passwordAlert('Please enter a password'));
    } else if (!p.passwordVerify) {
      return dispatch(passwordAlert('Please enter a password verification'));
    } else if (p.password !== p.passwordVerify) {
      return dispatch(passwordAlert('Password does not match Password verification'));
    }
    return dispatch(password(p));
  };
}

// END PASSWORD EDIT

// NEW ACCOUNT
export function accountNewShow(show) {
  return {
    type: ACCOUNT_NEW_SHOW,
    accountNewShow: show,
    accountNewAlert: null,
  };
}
export function accountNewAlert(alert) {
  return {
    type: ACCOUNT_NEW_ALERT,
    accountNewShow: true,
    accountNewAlert: alert,
  };
}

function accountNewStart() {
  return {
    type: ACCOUNT_NEW_START,
    isEditing: true,
  };
}

function accountNewStop(p) {
  const data = p.data;
  const newState = {
    type: ACCOUNT_NEW_STOP,
    isEditing: false,
    validated: false,
    accountNewAlert: null,
    accountNewShow: false,
    fetchTS: Date.now(),
  };
  if (data.error) {
    newState.accountNewAlert = data.detail;
    newState.accountNewShow = true;
  } else {
    newState.validated = data.validated;
    newState.user = data.user;
  }
  return newState;
}
function accountNew(p) {
  return (dispatch, getState) => {
    const state = getState();
    const cfg = state.app.cfg.fetch;
    const url = `${cfg.apiHost}${cfg.apiUserPath}new`;
    dispatch(accountNewStart());
    const data = new FormData();
    Object.keys(p).forEach(key => data.append(key, p[key] || ''));
    return fetch(url, { method: 'post', body: data, credentials: 'include' }).then(response => response.json()).then(data2 => dispatch(accountNewStop({ data: data2 })));
  };
}
export function accountNewInit(p) {
  return (dispatch, getState) => {
    const uState = getState().user;
    let alert = false;
    if (uState.validated) {
      alert = 'User is logged in, please logout first';
    } else if (uState.isEditing) {
      alert = 'New Account is being processed, please wait';
    } else if (!p.username) {
      alert = 'Username is required';
    } else if (!p.email) {
      alert = 'Email is required';
    } else if (!p.password) {
      alert = 'Password is required';
    } else if (!p.passwordVerify) {
      alert = 'Password Verify is required';
    } else if (p.password !== p.passwordVerify) {
      alert = 'Password does not match Password Verify';
    }
    if (alert) {
      return dispatch(accountNewAlert(alert));
    }
    return dispatch(accountNew(p));
  };
}
// END ACCOUNT NEW

// START RESET
// start the password reset process
// will result in an email being sent with reset url
export function resetShow(show) {
  return {
    type: RESET_SHOW,
    resetAlert: null,
    resetShow: show,
  };
}
export function resetAlert(alert) {
  return {
    type: RESET_ALERT,
    resetAlert: alert,
    resetShow: true,
  };
}

function resetStart() {
  return {
    type: RESET_START,
    isResetting: true,
  };
}

function resetStop(p) {
  const data = p.data;
  const newData = {
    type: RESET_STOP,
    isResetting: false,
    resetAlert: null,
    resetShow: true,
    msgShow: false,
    msg: null,
    fetchTS: Date.now(),
  };
  if (data.error) {
    newData.resetAlert = data.detail;
  } else if (data.msg) {
    newData.resetShow = false;
    newData.msg = data.msg;
    newData.msgShow = true;
  }
  return newData;
}
function reset(p) {
  return (dispatch, getState) => {
    const state = getState();
    const cfg = state.app.cfg.fetch;
    const url = `${cfg.apiHost}${cfg.apiUserPath}reset`;
    dispatch(resetStart());
    const data = new FormData();
    data.append('username', p.username);
    return fetch(url, { method: 'post', body: data, credentials: 'include' }).then(response => response.json()).then(data2 => dispatch(resetStop({ data: data2 })));
  };
}
export function resetInit(p) {
  return (dispatch, getState) => {
    const uState = getState().user;
    if (uState.validated) {
      // console.log('STATUS [reset account]: Not logged in !');
      return uState;
    } else if (!p.username) {
      return dispatch(resetAlert('Please enter a Username or Email to Reset'));
    }
    return dispatch(reset(p));
  };
}
// END RESET


// PASSWORD RESET
export function passwordResetShow(p) {
  return {
    type: PASSWORD_RESET_SHOW,
    passwordResetShow: p.show,
    passwordResetAlert: null,
    passwordResetToken: p.token,
  };
}

function passwordResetAlert(alert) {
  return {
    type: PASSWORD_RESET_ALERT,
    passwordResetAlert: alert,
    passwordResetShow: true,
  };
}

function passwordResetStart() {
  return {
    type: PASSWORD_RESET_START,
    isEditingPassword: true,
  };
}

function passwordResetStop(p) {
  const data = p.data;
  const newState = {
    type: PASSWORD_RESET_STOP,
    isEditingPassword: false,
    passwordResetAlert: null,
    passwordResetShow: false,
    validated: data.validated,
    fetchTS: Date.now(),
  };
  if (data.error) {
    newState.passwordResetAlert = data.detail;
    newState.passwordResetShow = true;
  } else if (data.validated) {
    newState.user = data.user;
    newState.passwordResetToken = false;
  }
  return newState;
}
function passwordReset(p) {
  return (dispatch, getState) => {
    const state = getState();
    const cfg = state.app.cfg.fetch;
    const url = `${cfg.apiHost}${cfg.apiUserPath}resetPassword`;
    const uState = state.user;
    const token = uState.passwordResetToken;
    dispatch(passwordResetStart());
    const data = new FormData();
    data.append('password', p.password);
    data.append('token', token);
    return fetch(url, { method: 'post', body: data, credentials: 'include' }).then(response => response.json()).then(data2 => dispatch(passwordResetStop({ data: data2 })));
  };
}

export function passwordResetInit(p) {
  return (dispatch, getState) => {
    const uState = getState().user;
    if (uState.validated) {
      // console.log('STATUS [password reset]: User is logged in !');
      return uState;
    } else if (uState.isEditingPassword) {
      // console.log('STATUS [password reset]: prior request');
      return uState;
    } else if (!p.password) {
      return dispatch(passwordResetAlert('Please enter a password'));
    } else if (!p.passwordVerify) {
      return dispatch(passwordResetAlert('Please enter a password verification'));
    } else if (p.password !== p.passwordVerify) {
      return dispatch(passwordResetAlert('Password does not match Password verification'));
    }
    return dispatch(passwordReset(p));
  };
}
// END PASSWORD EDIT


// START MSG
export function msgShow(p) {
  return {
    type: MSG_SHOW,
    msg: p.msg,
    msgShow: p.msgShow || p.show,
  };
}
// END MSG

// NOT USED
export function initUser() {
  return (dispatch, getState) => {
    const state = getState().user;
    const token = (state ? state.token : false);
    const p = { type: INIT_USER, userInit: false, user: { id: 'guest', username: 'Guest', validated: false }, validated: false, token };
    if (isServerSide && token) {
      // if there is a token we can restore this user and validate
      // this is happening on the server
      return dispatch(restoreUserInit({ token }));
    }
    return p;
  };
}
