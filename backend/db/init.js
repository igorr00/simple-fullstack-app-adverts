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
      ('Samsung Earphones', 'An unused Samsung original earphones', 'https://m.media-amazon.com/images/I/51fQJaiOO2L.jpg', 10.0, 'technology', 1, 'Belgrade', '2025-05-01'),
      ('Sofa', 'Comfortable 3-seat sofa', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj44WXNCvU0WUfQremT6km5mxHlpupxC0oNQ&s', 300.0, 'furniture', 2, 'Novi Sad', '2025-06-10'),
      ('Laptop', 'Gaming laptop', 'https://www.tehnomedia.rs/products/120759_thumb_0_cached.jpg', 900.0, 'technology', 3, 'Niš', '2025-07-01'),
      ('Puma RS-FAST', 'Best running shoes Puma 2025', 'https://www.n-sport.net/UserFiles/products/big/02/08/muske-patike-puma-rs-fast-380562-05.jpg', 100.0, 'clothing', 1, 'Novi Sad', '2025-05-01'),
      ('Puma ESS sweatsuit', 'Comfortable modern sweatsuit', 'https://www.n-sport.net/UserFiles/products/medium/02/06/muska-trenerka-puma-ess-sweat-suit-tr-684848-01.jpg', 60.0, 'clothing', 2, 'Novi Sad', '2025-06-10'),
      ('Nike Air Max Alpha Trainer 6', 'Mens running shoes Nike Air Max Alpha Trainer 6', 'https://www.n-sport.net/UserFiles/products/medium/01/29/muske-patike-nike-m-air-max-alpha-trainer-6-FQ1833-400.jpg', 70.0, 'clothing', 3, 'Beograd', '2025-07-01'),
      ('MulWark Socket Tool', 'MulWark 30PC Super Universal Socket Tool - Magnetic Ratcheting Screwdriver with Torx/Square/Slotted/Phillips/Hexagonal Screwdriver Bits - Socket Set with Power Drill Adapter - Gift for Men', 'https://m.media-amazon.com/images/I/71jyyJM7zUL._AC_SX569_PIbundle-30,TopRight,0,0_SH20_.jpg', 21.0, 'tools', 1, 'Belgrade', '2025-05-01'),
      ('Screwdriver Set', '42 in 1 Magnetic Screwdriver Set, DIY Ratchet Screwdriver Set, Multi Bit Magnetic Drive Set with Detachable Ratchet Handle, Portable Compact Repair Tool Kit for Home Furniture Computer Bicycle', 'https://m.media-amazon.com/images/I/710ck8oqJ+L._AC_SY300_SX300_.jpg', 30.0, 'tools', 2, 'Novi Sad', '2025-06-10'),
      ('Geinxurn screwdriver', 'Magnetic 2PC Mini Changeable Head Manual Screwdriver Holder, Quick Change&Release 1/4 Hex Bit Extension Holder', 'https://m.media-amazon.com/images/I/61i2W6EaBNL.__AC_SX300_SY300_QL70_FMwebp_.jpg', 9.0, 'tools', 3, 'Niš', '2025-07-01'),
      ('The Hobbit and The Lord of the Rings', 'J.R.R. Tolkien 4-Book Boxed Set: The Hobbit and The Lord of the Rings', 'https://m.media-amazon.com/images/I/91K8TYMlpfL.jpg', 52.0, 'books', 1, 'Belgrade', '2025-05-01'),
      ('The Silmarillion', 'J.R.R. Tolkien The Silmarillion Collector''s Edition', 'https://m.media-amazon.com/images/I/41SdroInykL._AC_UY266_FMwebp_.jpg?aicid=books-design-system-web', 12.0, 'books', 2, 'Novi Sad', '2025-06-10'),
      ('The Hobbit', 'J.R.R. Tolkien The Hobbit', 'https://m.media-amazon.com/images/I/712cDO7d73L._SY425_.jpg', 20.0, 'books', 3, 'Niš', '2025-07-01'),
      ('Resident Evil 4', 'Resident Evil 4 - PlayStation 4 Standard Edition', 'https://m.media-amazon.com/images/I/71CTrpj6s+L._SX385_.jpg', 18.0, 'games', 1, 'Belgrade', '2025-05-01'),
      ('Resident Evil 4 REMAKE', 'Resident Evil 4 REMAKE - PS5', 'https://m.media-amazon.com/images/I/712XPl7+qKL._SX385_.jpg', 20.0, 'games', 2, 'Novi Sad', '2025-06-10'),
      ('EA SPORTS College Football 26', 'EA SPORTS College Football 26 - PlayStation 5', 'https://m.media-amazon.com/images/I/51HZi0l3jiL._SY430_SX215_QL70_FMwebp_.jpg', 70.0, 'games', 3, 'Niš', '2025-07-01'),
      ('Grand Theft Auto V', 'Grand Theft Auto V - PS5', 'https://m.media-amazon.com/images/I/51Exwr1J-QL._SX300_SY300_QL70_FMwebp_.jpg', 24.0, 'games', 1, 'Belgrade', '2025-05-01'),
      ('EA SPORTS FC 25', 'EA SPORTS FC 25 Standard Edition PS5 | EU Version Region Free', 'https://m.media-amazon.com/images/I/41aULEJF13L._SY430_SX215_QL70_FMwebp_.jpg', 41.0, 'games', 2, 'Novi Sad', '2025-06-10'),
      ('NBA 2K25', 'NBA 2K25 - PlayStation 5', 'https://m.media-amazon.com/images/I/41CNOTBGncL._SY430_SX215_QL70_FMwebp_.jpg', 20.0, 'games', 3, 'Niš', '2025-07-01'),
      ('Spalding Basketball', 'Spalding Indoor Outdoor Basketballs | All Surface Composite Cover | Sizes 29.5, 28.5, 27.5', 'https://m.media-amazon.com/images/I/911gSaqaXvL.__AC_SX300_SY300_QL70_FMwebp_.jpg', 40.0, 'sports', 1, 'Belgrade', '2025-05-01'),
      ('Wilson Tennis Racket', 'Wilson Federer Adult Recreational Tennis Racket - Grip Size 3 - 4 3/8, Red/White/Black', 'https://m.media-amazon.com/images/I/61YARwXt2-L.__AC_SX300_SY300_QL70_FMwebp_.jpg', 29.0, 'sports', 2, 'Novi Sad', '2025-06-10'),
      ('WILSON Tennis Balls', 'WILSON US Open Tennis Balls - 3 Balls', 'https://m.media-amazon.com/images/I/61sWyOQLxjL.__AC_SX300_SY300_QL70_FMwebp_.jpg', 6.0, 'sports', 3, 'Niš', '2025-07-01'),
      ('Fresh Step Cat Litter', 'Fresh Step Advanced Clumping Litter with Febreze Freshness with Gain Scent, Fights Odor on Contact, 37 lbs. (2 x 18.5 lb. Box) (Package May Vary)', 'https://m.media-amazon.com/images/I/815CJ8YX8YL.__AC_SX300_SY300_QL70_FMwebp_.jpg', 34.0, 'pets', 1, 'Belgrade', '2025-05-01'),
      ('Benebone Dog Chew Toy', 'Benebone Wishbone Durable Dog Chew Toy for Aggressive Chewer''s, Real Bacon, Made in USA, Medium', 'https://m.media-amazon.com/images/I/71fKSebqrZL.__AC_SX300_SY300_QL70_FMwebp_.jpg', 13.0, 'pets', 2, 'Novi Sad', '2025-06-10'),
      ('Wahl Dog Shampoo', 'Wahl USA Dry Skin & Itch Relief Pet Shampoo for Dogs Oatmeal Formula with Coconut Lime Verbena & Pet Friendly Formula, 24 Oz - Model 820004A', 'https://m.media-amazon.com/images/I/71Npnm2RvjL.__AC_SX300_SY300_QL70_FMwebp_.jpg', 9.0, 'pets', 3, 'Niš', '2025-07-01');
    `);

    console.log("Seed data inserted");
  } catch (err) {
    console.error("Error creating or seeding tables:", err.message);
  }
};

module.exports = createTables;
