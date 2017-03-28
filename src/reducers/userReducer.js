import * as Act from '../actions/userActions';
import initialState from '../initialState';

function userReducer(userState = initialState.user, action) {
  const { type, ...newState } = action;
  const finalState = { ...userState, ...newState };
  switch (type) {
    case Act.INIT_USER:
    case Act.LOGIN_SHOW:
    case Act.LOGIN_START:
    case Act.LOGIN_STOP:
    case Act.LOGIN_ALERT:
    case Act.RESTORE_START:
    case Act.RESTORE_STOP:
    case Act.LOGOUT_START:
    case Act.LOGOUT_STOP:
    case Act.ACCOUNT_NEW_SHOW:
    case Act.ACCOUNT_NEW_ALERT:
    case Act.ACCOUNT_NEW_START:
    case Act.ACCOUNT_NEW_STOP:
    case Act.ACCOUNT_SHOW:
    case Act.ACCOUNT_ALERT:
    case Act.ACCOUNT_START:
    case Act.ACCOUNT_STOP:
    case Act.PASSWORD_SHOW:
    case Act.PASSWORD_ALERT:
    case Act.PASSWORD_START:
    case Act.PASSWORD_STOP:
    case Act.PASSWORD_RESET_SHOW:
    case Act.PASSWORD_RESET_ALERT:
    case Act.PASSWORD_RESET_START:
    case Act.PASSWORD_RESET_STOP:
    case Act.RESET_SHOW:
    case Act.RESET_ALERT:
    case Act.RESET_START:
    case Act.RESET_STOP:
    case Act.MSG_SHOW:
      return finalState;
    default:
      return userState;
  }
}

export default userReducer;
