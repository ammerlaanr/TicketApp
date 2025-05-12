import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';

export default function Header() {
  const { token, rol } = useAuth();

//   const handleLogout = () => {
//     setToken(null);
//     setRol(null);
//   };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary p-0 m-0" style={{ width: '100vw', left: 0, right: 0, position: 'fixed', top: 0, zIndex: 100 }}>
          <div className="w-100 d-flex flex-row align-items-center justify-content-center gap-4" style={{ minHeight: 56 }}>
            <div className="navbar-brand fw-bold ms-3">🎟️ TicketApp</div>
            <ul className="navbar-nav flex-row gap-3 ms-3">
            {token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/events">Evenementen</Link>
                </li>
                {rol === 'admin' && <li>
                  <Link className="nav-link" to="/addEvent">Voeg Event toe</Link>
                </li>}
              </>
              ) : (
              <>  
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Registreer</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">Login</Link>
                </li>
              </>
            )}  
            </ul>
          </div>
    </nav>
  );
};