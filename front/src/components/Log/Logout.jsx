import React from 'react';

const Logout = () => {
  const logout = async () => {
    window.localStorage.clear();

    window.location = '/home';
  };

  return (
    <li className="logout" onClick={logout}>
      <img src="./img/icons/logout.svg" alt="logout" />
    </li>
  );
};

export default Logout;
