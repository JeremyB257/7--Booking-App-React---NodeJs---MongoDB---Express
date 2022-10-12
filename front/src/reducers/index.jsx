import { combineReducers } from 'redux';

import usersReducer from './users.reducer';
import userReducer from './user.reducer';
import errorReducer from './error.reducer';

export default combineReducers({
  userReducer,
  usersReducer,
  errorReducer,
});
