import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn, getUser } from '../utils/localStorage';
import { logout } from '../services/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const user = getUser();
  const loggedIn = isLoggedIn();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          📝 NotesApp
        </Link>
        
        <div className="navbar-menu">
          {loggedIn ? (
            <>
              <Link to="/dashboard" className="navbar-link">
                Dashboard
              </Link>
              <span className="navbar-user">Hi, {user?.name}</span>
              <button onClick={handleLogout} className="btn btn-logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">
                Login
              </Link>
              <Link to="/register" className="navbar-link">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
