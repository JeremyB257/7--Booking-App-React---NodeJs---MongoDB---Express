import { combineReducers } from 'redux';

import usersReducer from './users.reducer';
import userReducer from './user.reducer';

export default combineReducers({
  userReducer,
  usersReducer,
});
