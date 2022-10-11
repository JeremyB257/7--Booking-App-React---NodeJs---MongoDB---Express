import React, { useContext } from 'react';

import { UidContext } from '../components/AppContext';
import LogPage from './LogPage';

const Profile = () => {
  const uid = useContext(UidContext);

  return uid ? (
    <>
      <Navbar />
      <div className="profil-page"></div>
    </>
  ) : (
    <LogPage />
  );
};

export default Profile;
