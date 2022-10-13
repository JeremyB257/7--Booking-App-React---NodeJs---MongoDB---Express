import { GET_USER_ERRORS } from '../actions/user.actions';
import { GET_HOTEL_ERRORS } from '../actions/hotel.actions';

const initialState = { userError: [], hotelError: [] };

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_ERRORS:
      return {
        userError: action.payload,
        hotelError: [],
      };
    case GET_HOTEL_ERRORS:
      return {
        hotelError: action.payload,
        userError: [],
      };
    default:
      return state;
  }
}
