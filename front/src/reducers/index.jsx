import { combineReducers } from 'redux';

import userReducer from './user.reducer';
import usersReducer from './users.reducer';
import hotelReducer from './hotel.reducer';
import hotelsReducer from './hotels.reducer';
import errorReducer from './error.reducer';

export default combineReducers({
  userReducer,
  usersReducer,
  hotelReducer,
  hotelsReducer,
  errorReducer,
});
