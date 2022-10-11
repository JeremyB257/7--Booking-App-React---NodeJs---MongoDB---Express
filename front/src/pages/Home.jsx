import React, { useContext } from 'react';

import { UidContext } from '../components/AppContext';

const Home = () => {
  const uid = useContext(UidContext);

  return <div>home</div>;
};

export default Home;
