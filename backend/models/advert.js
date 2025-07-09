const pool = require('../db');

const createAdvert = async (advert) => {
  const { name, description, picture_url, price, category, user_id, city, date } = advert;
  const result = await pool.query(
    'INSERT INTO adverts (name, description, picture_url, price, category, user_id, city, date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [name, description, picture_url, price, category, user_id, city, date]
  );
  return result.rows[0];
};

module.exports = { createAdvert };