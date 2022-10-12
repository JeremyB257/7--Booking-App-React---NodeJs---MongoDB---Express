import React, { useContext } from 'react';

import { UidContext } from '../components/AppContext';
import Footer from '../components/Footer';
import SearchFilter from '../components/Home/SearchFilter';
import Navbar from '../components/Navbar';

const Home = () => {
  const uid = useContext(UidContext);

  return (
    <>
      <Navbar />
      <main>
        <SearchFilter />
      </main>
      <Footer />
    </>
  );
};

export default Home;
