const Fakultas = require('../models/Fakultas');

exports.create = async (req, res, next) => {
  try {
    const { kode, nama } = req.body;
    const fakultas = await Fakultas.create({ kode, nama });
    res.status(201).json(fakultas);
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const data = await Fakultas.find();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
