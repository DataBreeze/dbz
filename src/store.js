// @flow
import { compose, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const composedStore = compose(
  applyMiddleware(thunk),
  (__CLIENT__ && window.devToolsExtension ? window.devToolsExtension() : f => f),
)(createStore);

const configureStore = (initialState, cookie) => {
  const token = (cookie ? cookie.token : false);
  initialState.user.token = token;
  return composedStore(reducer, initialState);
};

export default configureStore;
