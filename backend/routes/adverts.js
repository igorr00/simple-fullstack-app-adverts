const express = require('express');
const router = express.Router();
const advertController = require('../controllers/advertController');

router.post('/', advertController.createAdvert);

module.exports = router;