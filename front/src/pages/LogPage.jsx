import React from 'react';
import Footer from '../components/Footer';
import Log from '../components/Log/Log';

const LogPage = () => {
  return (
    <>
      <div className="log-page">
        <img src="./img/logo/booki@3x.png" alt="Logo Booki" />

        <p>Hebergeur de rêve</p>
        <div className="log-container">
          <Log login={true} signup={false} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LogPage;
