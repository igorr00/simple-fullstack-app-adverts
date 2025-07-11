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

    console.log("Tables created");

    await pool.query('TRUNCATE adverts, users RESTART IDENTITY CASCADE;');

    await pool.query(`
      INSERT INTO users (name, password, register_date, phone) VALUES
      ('igor', 'asd', '2025-07-09', '12345'),
      ('pera', 'asd', '2025-07-10', '123123'),
      ('mika', 'asd', '2025-07-10', '321123')
    `);

    await pool.query(`
      INSERT INTO adverts (name, description, picture_url, price, category, user_id, city, date) VALUES
      ('Samsung Earphones', 'An unused Samsung original earphones', 'https://m.media-amazon.com/images/I/51fQJaiOO2L.jpg', 10.00, 'technology', 1, 'Belgrade', '2025-05-01'),
      ('Sofa', 'Comfortable 3-seat sofa', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj44WXNCvU0WUfQremT6km5mxHlpupxC0oNQ&s', 300.00, 'furniture', 2, 'Novi Sad', '2025-06-10'),
      ('Laptop', 'Gaming laptop', 'https://www.tehnomedia.rs/products/120759_thumb_0_cached.jpg', 900.00, 'technology', 3, 'Niš', '2025-07-01')
    `);

    console.log("Seed data inserted");
  } catch (err) {
    console.error("Error creating or seeding tables:", err.message);
  }
};

module.exports = createTables;
