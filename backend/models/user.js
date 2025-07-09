const pool = require('../db');

const createUser = async (user) => {
  const { name, password, register_date, phone } = user;
  const result = await pool.query(
    'INSERT INTO users (name, password, register_date, phone) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, password, register_date, phone]
  );
  return result.rows[0];
};

module.exports = { createUser };