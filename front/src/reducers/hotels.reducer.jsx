import { GET_ALL_HOTELS } from '../actions/hotels.actions';

const initialState = {};

export default function hotelsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_HOTELS:
      return action.payload;
    default:
      return state;
  }
}
