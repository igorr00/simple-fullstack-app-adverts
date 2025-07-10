const advertModel = require('../models/advert');

const createAdvert = async (req, res) => {
  try {
    const advert = await advertModel.createAdvert(req.body);
    res.status(201).json(advert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAdverts = async (req, res) => {
  try {
    const adverts = await advertModel.getAdverts();
    res.status(200).json(adverts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAdvertById = async (req, res) => {
  try {
    const advert = await advertModel.getAdvertById(req.params.id);
    if (!advert) return res.status(404).json({ error: 'Advert not found' });
    res.status(200).json(advert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateAdvert = async (req, res) => {
  try {
    const updatedAdvert = await advertModel.updateAdvert(req.params.id, req.body);
    if (!updatedAdvert) return res.status(404).json({ error: 'Advert not found' });
    res.status(200).json(updatedAdvert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteAdvert = async (req, res) => {
  try {
    await advertModel.deleteAdvert(req.params.id);
    res.status(200).json({ message: 'Advert deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createAdvert, getAdverts, getAdvertById, updateAdvert, deleteAdvert };