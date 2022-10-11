import axios from 'axios';
export const GET_HOTELS = 'GET_HOTELS';

export const getHotels = () => {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: `${process.env.REACT_APP_PUBLIC_URL}api/hotel`,
    })
      .then((res) => {
        dispatch({ type: GET_HOTELS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
