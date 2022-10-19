import React, { useContext } from 'react';
import { UidContext } from '../components/AppContext';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ProfilHotel from '../components/Profil/ProfilHotel';
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
          <ProfilHotel />
        </div>
      </main>
      <Footer />
    </>
  ) : (
    <LogPage />
  );
};

export default Profile;
