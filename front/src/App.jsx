import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogPage from './pages/LogPage';
import Home from './pages/Home';
import Profil from './pages/Profil';
import AddHotel from './pages/AddHotel';
import axios from 'axios';
import { UidContext } from './components/AppContext';
import { useDispatch } from 'react-redux';
import { getUser } from './actions/user.actions';

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: 'get',
        url: `${process.env.REACT_APP_PUBLIC_URL}jwtid`,
        headers: { Authorization: 'Bearer ' + window.localStorage.getItem('jwt') },
      })
        .then((res) => {
          setUid(res.data.id);
        })
        .catch((err) => console.log('No token'));
    };
    fetchToken();

    if (uid) dispatch(getUser(uid));
  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/log" element={<LogPage />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/addhotel" element={<AddHotel />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </UidContext.Provider>
  );
};

export default App;
