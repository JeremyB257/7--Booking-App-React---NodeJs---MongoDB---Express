import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Log from '../Log/Log';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [log, setLog] = useState(false);

  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src="./img/logo/Booki@3x.png" alt="logo Booki" />
        </Link>
      </div>
      {user ? (
        `Bonjour ${user.username}`
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
              <a href="#lodging">Hébergements</a>
            </li>
            <li>
              <a href="#activity">Activités</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
