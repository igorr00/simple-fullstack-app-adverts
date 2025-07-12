const pool = require('../db');

const createAdvert = async (advert) => {
  const { name, description, picture_url, price, category, user_id, city, date } = advert;
  const result = await pool.query(
    'INSERT INTO adverts (name, description, picture_url, price, category, user_id, city, date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [name, description, picture_url, price, category, user_id, city, date]
  );
  return result.rows[0];
};

const getAdverts = async ({ limit, offset, name, minPrice, maxPrice, category, userId }) => {
  let query = 'SELECT * FROM adverts WHERE 1=1';
  const values = [];
  let index = 1;

  if (name) {
    query += ` AND LOWER(name) LIKE LOWER($${index++})`;
    values.push(`%${name}%`);
  }

  if (minPrice) {
    query += ` AND price >= $${index++}`;
    values.push(minPrice);
  }

  if (maxPrice) {
    query += ` AND price <= $${index++}`;
    values.push(maxPrice);
  }

  if (category) {
    query += ` AND category = $${index++}`;
    values.push(category);
  }

  if (userId) {
    query += ` AND user_id = $${index++}`;
    values.push(userId);
  }

  query += ` ORDER BY date DESC LIMIT $${index++} OFFSET $${index++}`;
  values.push(limit, offset);

  const result = await pool.query(query, values);
  return result.rows;
};

const getAdvertById = async (id) => {
  const result = await pool.query('SELECT * FROM adverts WHERE id = $1', [id]);
  return result.rows[0];
};

const updateAdvert = async (id, advert) => {
  const { name, description, picture_url, price, category, user_id, city, date } = advert;
  const result = await pool.query(
    'UPDATE adverts SET name = $1, description = $2, picture_url = $3, price = $4, category = $5, user_id = $6, city = $7, date = $8 WHERE id = $9 RETURNING *',
    [name, description, picture_url, price, category, user_id, city, date, id]
  );
  return result.rows[0];
};

const deleteAdvert = async (id) => {
  await pool.query('DELETE FROM adverts WHERE id = $1', [id]);
};

module.exports = { createAdvert, getAdverts, getAdvertById, updateAdvert, deleteAdvert };
