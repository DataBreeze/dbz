import { INIT_APP } from '../actions/appActions';
import initialState from '../initialState';

function appReducer(appState = initialState.app, action) {
  const { type, ...newState } = action;
  const finalState = { ...appState, ...newState };
  switch (type) {
    case INIT_APP:
      return finalState;
    default:
      return appState;
  }
}

export default appReducer;
