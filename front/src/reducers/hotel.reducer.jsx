import { DELETE_HOTEL, GET_HOTEL } from '../actions/hotel.actions';

const initialState = {};

export default function hotelReducer(state = initialState, action) {
  switch (action.type) {
    case GET_HOTEL:
      return action.payload;
    case DELETE_HOTEL:
      return action.payload;
    default:
      return state;
  }
}
