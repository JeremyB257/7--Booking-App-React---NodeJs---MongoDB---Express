import React, { useContext } from 'react';

import { UidContext } from '../components/AppContext';
import Navbar from '../components/Navbar';

const Home = () => {
  const uid = useContext(UidContext);

  return (
    <>
      <Navbar />
      home
    </>
  );
};

export default Home;
