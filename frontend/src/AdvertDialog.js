import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdvertDialog.css';

const AdvertDialog = ({ advert, onClose }) => {
  const isEdit = !!advert;
  const user = JSON.parse(localStorage.getItem('user'));

  const [name, setName] = useState(advert?.name || '');
  const [description, setDescription] = useState(advert?.description || '');
  const [picture_url, setPictureUrl] = useState(advert?.picture_url || '');
  const [price, setPrice] = useState(advert?.price || '');
  const [category, setCategory] = useState(advert?.category || '');
  const [user_id, setUserId] = useState(advert?.user_id || user.id);
  const [city, setCity] = useState(advert?.city || '');
  const [date, setDate] = useState(advert?.date || new Date());

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

  useEffect(() => {
  if (isEdit) {
    setName(advert.name);
    setDescription(advert.description);
    setPictureUrl(advert.picture_url);
    setPrice(advert.price);
    setCategory(advert.category);
    setCity(advert.city);
    setDate(advert.date);
  }
}, [advert]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  const advertData = {
    name,
    description,
    picture_url,
    price,
    category,
    user_id,
    city,
    date: new Date(date).toISOString().split('T')[0], // Format date
  };

  const url = advert
    ? `http://localhost:5000/api/adverts/${advert.id}`
    : 'http://localhost:5000/api/adverts';

  const method = advert ? 'put' : 'post';

  try {
    await axios[method](url, advertData, {
      headers: { 'Content-Type': 'application/json' }
    });
    onClose(true);
  } catch (err) {
    console.error('Error saving advert', err.response?.data || err.message);
  }
};

  return (
    <div className="dialog-backdrop" onClick={() => onClose(false)}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <h2>{isEdit ? 'Edit Advert' : 'Add Advert'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Advert Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Picture Url"
            value={picture_url}
            onChange={(e) => setPictureUrl(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />

          <button className='btn-edit-add' type="submit">{advert ? 'Update' : 'Add'} Advert</button>
        </form>
      </div>
    </div>
  );
};

export default AdvertDialog;