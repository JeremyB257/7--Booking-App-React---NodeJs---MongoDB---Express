import React, { useContext } from 'react';
import { UidContext } from '../components/AppContext';
import Navbar from '../components/Navbar';
import LogPage from './LogPage';

const Profile = () => {
  const uid = useContext(UidContext);

  return uid ? (
    <>
      <Navbar />
      <div className="profil-page">profil</div>
    </>
  ) : (
    <LogPage />
  );
};

export default Profile;
