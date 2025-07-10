const express = require('express');
const app = express();
require('dotenv').config();
const userRoutes = require('./routes/users');
const advertRoutes = require('./routes/adverts');
const createTables = require('./db/init');
const cors = require('cors');

app.use(cors());

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/adverts', advertRoutes);
createTables();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
