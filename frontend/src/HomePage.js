import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import AdvertDialog from './AdvertDialog';

const HomePage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = user !== null && user !== undefined;

  const [adverts, setAdverts] = useState([]);
  const [page, setPage] = useState(1);

  const [name, setName] = useState('');
  const [minPrice, setMinprice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [category, setCategory] = useState('');
  const [showMineOnly, setShowMineOnly] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAdvert, setSelectedAdvert] = useState(null);

  const categories = [
    "clothing",
    "tools",
    "sports",
    "accessories",
    "furniture",
    "pets",
    "games",
    "books",
    "technology"
  ];

  const fetchAdverts = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/adverts?page=${page}&limit=20`);
      const data = await res.json();
      setAdverts(data);
    } catch (err) {
      console.error('Failed to fetch adverts:', err);
    }
  };

  const filterAdverts = async () => {
    const queryParams = new URLSearchParams();

    if (name) queryParams.append('name', name);
    if (minPrice) queryParams.append('minPrice', minPrice);
    if (maxPrice) queryParams.append('maxPrice', maxPrice);
    if (category) queryParams.append('category', category);
    if (showMineOnly && user) queryParams.append('userId', user.id);
    queryParams.append('page', page);

    const res = await fetch(`http://localhost:5000/api/adverts?${queryParams.toString()}`);
    const data = await res.json();
    setAdverts(data);
  }

  useEffect(() => {
    fetchAdverts();
  }, [page]);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/adverts/${id}`, { method: 'DELETE' });
    fetchAdverts();
  };

  const handleEdit = (advert) => {
    setSelectedAdvert(advert);
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setSelectedAdvert(null);
    setDialogOpen(true);
  };

  const handleDialogClose = (updated) => {
    setDialogOpen(false);
    setSelectedAdvert(null);
    if (updated) fetchAdverts();
  };

  const viewAdvert = async (id) => {
    localStorage.setItem('advertId', id);
    navigate('/viewAdvert');
  };

  return (
    <div className="home-page">
      <header className="top-nav">
        <nav className="nav-links">
          {isLoggedIn ? (
            <>
              <p><b>{user.name} |</b></p>
              <button className="navbar-button" onClick={() => localStorage.removeItem('user') || navigate('/login')}><b>Sign Out</b></button>
              <button className="navbar-button" onClick={() => handleAdd()}><b>Add Advert</b></button>
            </>
          ) : (
            <>
              <button className="navbar-button" onClick={() => navigate('/login')}><b>Log In</b></button>
              <button className="navbar-button" onClick={() => navigate('/register')}><b>Sign Up</b></button>
            </>
          )}
        </nav>
      </header>
      
      <div className='filter-container'>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Name"
            className="filter-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Min Price"
            className="filter-input"
            value={minPrice}
            onChange={(e) => setMinprice(e.target.value)}
          />
          <input
            type="text"
            placeholder="Max Price"
            className="filter-input"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <label className='show-mine-only'>
            Show mine only
            <input
              type="checkbox"
              checked={showMineOnly}
              onChange={(e) => setShowMineOnly(e.target.checked)}
            />
          </label>
          <button className='editButton' onClick={() => filterAdverts()}>Filter</button>
        </div>
      </div>

      <div className="advert-table-container">
        <table className="advert-table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Price</th>
              <th>City</th>
              <th>Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {adverts.map((advert) => (
              <tr className='advert-row' key={advert.id}>
                <td onClick={() => viewAdvert(advert.id)}><img src={advert.picture_url} alt={advert.name} className="advert-image" /></td>
                <td onClick={() => viewAdvert(advert.id)}>{advert.name}</td>
                <td onClick={() => viewAdvert(advert.id)}>{advert.price} €</td>
                <td onClick={() => viewAdvert(advert.id)}>{advert.city}</td>
                <td onClick={() => viewAdvert(advert.id)}>{advert.category}</td>
                {(isLoggedIn && advert.user_id === user.id) ? (
                  <td>
                    <button className='editButton' onClick={() => handleEdit(advert)}>Edit</button>
                    <button className='editButton' onClick={() => handleDelete(advert.id)}>Delete</button>
                  </td>
                ) : (
                  <td></td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>Prev</button>
          <span>Page {page}</span>
          <button onClick={() => setPage(p => p + 1)}>Next</button>
        </div>

        {dialogOpen && selectedAdvert && (
          <AdvertDialog
            advert={selectedAdvert}
            onClose={handleDialogClose}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
