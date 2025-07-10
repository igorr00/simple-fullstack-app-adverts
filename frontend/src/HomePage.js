import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleSignOut = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isLoggedIn = user !== null && user !== undefined;

  return (
    <div className="home-page">
      <header className="top-nav">
        <nav className="nav-links">
          {isLoggedIn ? (
            <>
              <p><b>{user.name}</b></p>
              <button onClick={handleSignOut}><b>Sign Out</b></button>
              <a href="/addAdvert"><b>Add Advert</b></a>
            </>
          ) : (
            <>
              <a href="/login"><b>Login</b></a>
              <a href="/register"><b>Sign Up</b></a>
            </>
          )}
        </nav>
      </header>
    </div>
  );
};

export default HomePage;
