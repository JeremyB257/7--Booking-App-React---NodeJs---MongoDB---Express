import React, { useContext } from 'react';
import { UidContext } from '../components/AppContext';
import Navbar from '../components/Navbar';
import UpdateProfil from '../components/Profil/UpdateProfil';
import LogPage from './LogPage';

const Profile = () => {
  const uid = useContext(UidContext);

  return uid ? (
    <>
      <Navbar />
      <div className="profil-page">
        <UpdateProfil />
      </div>
    </>
  ) : (
    <LogPage />
  );
};

export default Profile;
