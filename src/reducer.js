import { combineReducers } from 'redux';
import sourceReducer from './reducers/sourceReducer';
import appReducer from './reducers/appReducer';
import userReducer from './reducers/userReducer';

const reducer = combineReducers({
  user: userReducer,
  app: appReducer,
  source: sourceReducer,
});

export default reducer;
