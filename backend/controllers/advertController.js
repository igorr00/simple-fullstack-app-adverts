const advertModel = require('../models/advert');

const createAdvert = async (req, res) => {
  try {
    const advert = await advertModel.createAdvert(req.body);
    res.status(201).json(advert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createAdvert };