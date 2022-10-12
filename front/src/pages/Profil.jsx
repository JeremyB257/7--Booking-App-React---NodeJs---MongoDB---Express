import React, { useContext } from 'react';
import { UidContext } from '../components/AppContext';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import UpdateProfil from '../components/Profil/UpdateProfil';
import LogPage from './LogPage';

const Profile = () => {
  const uid = useContext(UidContext);

  return uid ? (
    <>
      <Navbar />
      <main>
        <div className="profil-page">
          <UpdateProfil />
        </div>
      </main>
      <Footer />
    </>
  ) : (
    <LogPage />
  );
};

export default Profile;
