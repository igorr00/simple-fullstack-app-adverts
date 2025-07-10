const express = require('express');
const router = express.Router();
const advertController = require('../controllers/advertController');

router.post('/', advertController.createAdvert);
router.get('/', advertController.getAdverts);
router.get('/:id', advertController.getAdvertById);
router.put('/:id', advertController.updateAdvert);
router.delete('/:id', advertController.deleteAdvert);

module.exports = router;