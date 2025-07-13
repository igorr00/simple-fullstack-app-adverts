import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewAdvert.css';

const ViewAdvert = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = user !== null && user !== undefined;

  const [advert, setAdvert] = useState(null);
  const [advertUser, setAdvertUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdvert = async () => {
      try {
        const advertId = localStorage.getItem('advertId');
        const advertRes = await fetch(`http://localhost:5000/api/adverts/${advertId}`);
        const advertData = await advertRes.json();
        setAdvert(advertData);

        const userRes = await fetch(`http://localhost:5000/api/users/${advertData.user_id}`);
        const userData = await userRes.json();
        setAdvertUser(userData);
      } catch (err) {
        console.error('Failed to fetch advert or user:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvert();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/adverts/${id}`, { method: 'DELETE' });
    navigate('/');
  };

  if (loading) return <p>Loading...</p>;
  if (!advert) return <p>Advert not found.</p>;

  return (
    <div className="view-advert">
        <header className="top-nav">
            <nav className="nav-links">
            {isLoggedIn ? (
                <>
                <p><b>{user.name} |</b></p>
                <button className="navbar-button" onClick={() => {
                    localStorage.removeItem('user');
                    navigate('/login');
                }}><b>Sign Out</b></button>
                <button className="navbar-button" onClick={() => navigate('/editAdvert')}><b>Add Advert</b></button>
                </>
            ) : (
                <>
                <button className="navbar-button" onClick={() => navigate('/login')}><b>Log In</b></button>
                <button className="navbar-button" onClick={() => navigate('/register')}><b>Sign Up</b></button>
                </>
            )}
            </nav>
        </header>

        <h1 className="advert-title">{advert.name}</h1>

        <div className="advert-content">
            <img src={advert.picture_url} alt={advert.name} className="advert-img" />
            <div className="advert-info">
            <p>{advert.description}</p>
            <p><b>Price:</b> {advert.price} $</p>
            <p><b>Category:</b> {advert.category}</p>
            <p><b>City:</b> {advert.city}</p>
            <p><b>Date:</b> {new Date(advert.date).toISOString().split('T')[0]}</p>
            </div>
        </div>

        <div className="user-info">
            <h3>{advertUser.name}</h3>
            <p><b>Phone:</b> {advertUser.phone}</p>
            <p><b>Register Date:</b> {new Date(advertUser.register_date).toISOString().split('T')[0]}</p>
        </div>

        {(isLoggedIn && advert.user_id === user.id) && (
            <div className="edit-delete-buttons">
                <button className="editButton" onClick={() => navigate(`/editAdvert`)}>Edit</button>
                <button className="editButton" onClick={() => handleDelete(advert.id)}>Delete</button>
            </div>
        )}
    </div>
  );
};

export default ViewAdvert;
