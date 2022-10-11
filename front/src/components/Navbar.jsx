import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { UidContext } from './AppContext';
import { Link } from 'react-router-dom';
import Log from './Log/Log';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const uid = useContext(UidContext);
  const [log, setLog] = useState(false);
  const user = useSelector((state) => state.userReducer);

  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src="./img/logo/Booki@3x.png" alt="logo Booki" />
        </Link>
      </div>
      {uid ? (
        <h4>
          Bonjour <Link to="/profil">{user.pseudo}</Link>
        </h4>
      ) : (
        <>
          <div className="navItems">
            <button className="navButton" onClick={() => setLog(!log)}>
              Register/Login
            </button>
          </div>
          {log ? (
            <div className="logModal">
              <Log login={true} signup={false} />
            </div>
          ) : null}
        </>
      )}
      <nav>
        <div className="nav">
          <ul>
            <li>
              <Link to="/home">Accueil</Link>
            </li>
            <li>
              <Link to="/profil">Profil</Link>
            </li>
            <li>
              <Link to="/hotel">Hotel</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
