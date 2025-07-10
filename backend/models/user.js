const pool = require('../db');

const createUser = async (user) => {
  const { name, password, register_date, phone } = user;
  const result = await pool.query(
    'INSERT INTO users (name, password, register_date, phone) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, password, register_date, phone]
  );
  return result.rows[0];
};

const getUsers = async () => {
  const result = await pool.query('SELECT * FROM users');
  return result.rows;
};

const getUserById = async (id) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

const updateUser = async (id, user) => {
  const { name, password, register_date, phone } = user;
  const result = await pool.query(
    'UPDATE users SET name = $1, password = $2, register_date = $3, phone = $4 WHERE id = $5 RETURNING *',
    [name, password, register_date, phone, id]
  );
  return result.rows[0];
};

const deleteUser = async (id) => {
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
};

const getUserByName = async (name) => {
  const result = await pool.query('SELECT * FROM users WHERE name = $1', [name]);
  return result.rows[0];
};

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser, getUserByName };
