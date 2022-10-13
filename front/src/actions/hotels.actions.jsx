import axios from 'axios';

export const GET_ALL_HOTELS = 'GET_ALL_HOTELS';

export const getAllHotels = () => {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: `${process.env.REACT_APP_PUBLIC_URL}api/hotel`,
    })
      .then((res) => {
        dispatch({ type: GET_ALL_HOTELS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
