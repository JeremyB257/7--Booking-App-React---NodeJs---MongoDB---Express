import axios from 'axios';

export const ADD_HOTELS = 'ADD_HOTELS';

//errors
export const GET_HOTEL_ERRORS = 'GET_HOTEL_ERRORS';

export const addHotel = (newHotel) => {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: `${process.env.REACT_APP_PUBLIC_URL}api/hotel`,
      headers: { Authorization: 'Bearer ' + window.localStorage.getItem('jwt') },
      data: newHotel,
    })
      .then((res) => {
        if (res.data.error) {
          dispatch({ type: GET_HOTEL_ERRORS, payload: res.data.error });
        } else {
          dispatch({ type: GET_HOTEL_ERRORS, payload: '' });
        }
      })
      .catch((err) => {
        if (err.response.data.error) {
          dispatch({ type: GET_HOTEL_ERRORS, payload: err.response.data.error });
        }
      });
  };
};
