import axios from 'axios';

export const GET_HOTEL = 'GET_HOTEL';
export const ADD_HOTELS = 'ADD_HOTELS';

//errors
export const GET_HOTEL_ERRORS = 'GET_HOTEL_ERRORS';

export const getHotel = (HotelId) => {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: `${process.env.REACT_APP_PUBLIC_URL}api${HotelId}`,
    })
      .then((res) => {
        dispatch({ type: GET_HOTEL, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

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
        if (err.response.data.message) {
          dispatch({ type: GET_HOTEL_ERRORS, payload: err.response.data.message });
        }
      });
  };
};
