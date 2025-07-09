const pool = require('./index');

const createTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        register_date DATE NOT NULL,
        phone VARCHAR(15)
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS adverts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        description TEXT,
        picture_url TEXT,
        price DECIMAL,
        category VARCHAR(50),
        user_id INTEGER REFERENCES users(id),
        city VARCHAR(100),
        date DATE NOT NULL
      );
    `);

    console.log("Tables created or already exist");
  } catch (err) {
    console.error("Error creating tables:", err.message);
  }
};

module.exports = createTables;
