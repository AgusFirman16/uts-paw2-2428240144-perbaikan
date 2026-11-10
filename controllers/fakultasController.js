const Fakultas = require('../models/Fakultas');
const Kandidat = require('../models/Kandidat');                    // baru
const { errorHttp } = require('../middlewares/errorHandler');      // baru

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

// PUT /fakultas/:id
exports.update = async (req, res, next) => {
  try {
    const { kode, nama } = req.body;

    const perubahan = {};
    if (kode !== undefined) perubahan.kode = kode;
    if (nama !== undefined) perubahan.nama = nama;

    const data = await Fakultas.findByIdAndUpdate(req.params.id, perubahan, {
      new: true,
      runValidators: true,
    });
    if (!data) {
      throw errorHttp(404, 'Data fakultas tidak ditemukan');
    }
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// DELETE /fakultas/:id (ditolak 409 bila masih dipakai kandidat)
exports.remove = async (req, res, next) => {
  try {
    const data = await Fakultas.findById(req.params.id);
    if (!data) {
      throw errorHttp(404, 'Data fakultas tidak ditemukan');
    }
    const dipakai = await Kandidat.countDocuments({ fakultasId: data._id });
    if (dipakai > 0) {
      throw errorHttp(409, 'Fakultas masih digunakan oleh kandidat');
    }
    await data.deleteOne();
    res.status(200).json({ message: 'Data fakultas berhasil dihapus' });
  } catch (err) {
    next(err);
  }
};