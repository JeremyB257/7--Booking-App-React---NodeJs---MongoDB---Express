import React from 'react';

const Logout = () => {
  const logout = async () => {
    window.localStorage.clear();

    window.location = '/log';
  };

  return (
    <li onClick={logout}>
      <img src="./img/icons/logout.svg" alt="logout" />
    </li>
  );
};

export default Logout;
