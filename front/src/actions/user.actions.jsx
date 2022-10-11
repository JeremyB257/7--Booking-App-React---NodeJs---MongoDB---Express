import axios from 'axios';

export const GET_USER = 'GET_USER';
export const UPDATE_BIO = 'UPDATE_BIO';

export const getUser = (uid) => {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: `${process.env.REACT_APP_PUBLIC_URL}api/user/${uid.id}`,
      headers: { Authorization: 'Bearer ' + window.localStorage.getItem('jwt') },
    })
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const updateBio = (userId, bio) => {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: `${process.env.REACT_APP_PUBLIC_URL}api/user/${userId}`,
      headers: { Authorization: 'Bearer ' + window.localStorage.getItem('jwt') },
      data: { bio },
    })
      .then((res) => {
        dispatch({ type: UPDATE_BIO, payload: bio });
      })
      .catch((err) => console.log(err));
  };
};
