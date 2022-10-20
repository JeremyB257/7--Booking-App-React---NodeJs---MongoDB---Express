import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { UidContext } from './AppContext';
import { NavLink } from 'react-router-dom';
import Log from './Log/Log';
import { useSelector } from 'react-redux';
import Logout from './Log/Logout';

const Navbar = () => {
  const uid = useContext(UidContext);
  const [log, setLog] = useState(false);
  const user = useSelector((state) => state.userReducer);

  return (
    <header>
      <div className="logo">
        <NavLink to="/">
          <img src="../img/logo/Booki@3x.png" alt="logo Booki" />
        </NavLink>
      </div>
      {uid ? (
        <h4>
          Bonjour <NavLink to="/profil">{user.pseudo}</NavLink>
        </h4>
      ) : (
        <>
          <div className="navItems">
            <button className="navButton" onClick={() => setLog(!log)}>
              Register/Login
            </button>
            {log ? (
              <div className="logModal">
                <Log login={true} signup={false} />
              </div>
            ) : null}
          </div>
        </>
      )}
      <nav>
        <div className="nav">
          <ul>
            <li>
              <NavLink to="/home" className={(nav) => (nav.isActive ? 'active-nav' : '')}>
                Accueil
              </NavLink>
            </li>
            <li>
              <NavLink to="/profil" className={(nav) => (nav.isActive ? 'active-nav' : '')}>
                Profil
              </NavLink>
            </li>
            <li>
              <NavLink to="/addhotel" className={(nav) => (nav.isActive ? 'active-nav' : '')}>
                Ajouter un hebergement
              </NavLink>
            </li>
            <Logout />
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
