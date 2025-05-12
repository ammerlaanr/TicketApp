import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';

export default function Header() {
  const { token, rol, setToken, setRol } = useAuth();

  const handleLogout = () => {
    setToken(null);
    setRol(null);
  };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark p-0 m-0" style={{ background: '#EC008C', width: '100vw', left: 0, right: 0, position: 'fixed', top: 0, zIndex: 100 }}>
          <div className="w-100 d-flex flex-row align-items-center justify-content-center gap-4" style={{ minHeight: 56 }}>
            <div className="navbar-brand fw-bold ms-3">🎟️ OELAN TicketApp</div>
            <ul className="navbar-nav flex-row gap-3 ms-3">
            {token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/events" style={{ color: '#ffffff' }}>Evenementen</Link>
                </li>
                {rol === 'admin' && 
                  <>
                    <li>
                      <Link className="nav-link" to="/addEvent" style={{ color: '#ffffff' }}>Voeg Event toe</Link>
                    </li>
                    <li>
                      <Link className="nav-link" to="/admin/logging" style={{ color: '#ffffff' }}>Logging</Link>
                    </li>
                  </>
                }
                <li className="nav-item">
                  <button
                    className="btn btn-outline-light btn-sm ms-2" style={{ background: "#fff", color: "#EC008C", margin: "5px 0 0 0" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
              ) : (
              <>  
                <li className="nav-item">
                  <Link className="nav-link" to="/register" style={{ color: '#ffffff' }}>Registreer</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/" style={{ color: '#ffffff' }}>Login</Link>
                </li>
              </>
            )}  
            </ul>
          </div>
    </nav>
  );
};