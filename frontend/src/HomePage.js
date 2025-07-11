import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleSignOut = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleAddAdvert = () => {
    navigate('/addAdvert');
  };

  const handleLogIn = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/register');
  };

  const isLoggedIn = user !== null && user !== undefined;

  return (
    <div className="home-page">
      <header className="top-nav">
        <nav className="nav-links">
          {isLoggedIn ? (
            <>
              <p><b>{user.name} |</b></p>
              <button className="navbar-button" onClick={handleSignOut}><b>Sign Out</b></button>
              <button className="navbar-button" onClick={handleAddAdvert}><b>Add Advert</b></button>
            </>
          ) : (
            <>
              <button className="navbar-button" onClick={handleLogIn}><b>Log In</b></button>
              <button className="navbar-button" onClick={handleSignUp}><b>Sign Up</b></button>
            </>
          )}
        </nav>
      </header>
    </div>
  );
};

export default HomePage;
