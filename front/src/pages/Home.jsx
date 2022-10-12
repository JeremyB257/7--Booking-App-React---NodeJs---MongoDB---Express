import React, { useContext } from 'react';

import { UidContext } from '../components/AppContext';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Home = () => {
  const uid = useContext(UidContext);

  return (
    <>
      <Navbar />
      <main>
        <h1>home</h1>
      </main>
      <Footer />
    </>
  );
};

export default Home;
