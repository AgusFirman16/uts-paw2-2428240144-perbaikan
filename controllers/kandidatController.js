const Kandidat = require('../models/Kandidat');
const { errorHttp } = require('../middlewares/errorHandler');

// C1: POST /kandidat (Hanya field dari tabel topik yang diterima dari body; field lain diabaikan)
exports.create = async (req, res, next) => {
  try {
    const { noUrut, nama, jumlahPendukung, jalur, wakil, fakultasId } = req.body;

    const dataBaru = {
      noUrut,
      nama,
      jumlahPendukung,
      jalur,
      wakil: wakil ? { nama: wakil.nama, nim: wakil.nim } : undefined,
      fakultasId,
    };

    const kandidat = await Kandidat.create(dataBaru);
    res.status(201).json(kandidat);
  } catch (err) {
    next(err);
  }
};

// C2 & C3: GET /kandidat, Filter ?jalur=..., dan Projection (_id, noUrut, nama, jumlahPendukung, jalur)
exports.getAll = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.jalur !== undefined) {
      filter.jalur = String(req.query.jalur);
    }

    const data = await Kandidat.find(filter).select(
      'noUrut nama jumlahPendukung jalur'
    );
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// C4: GET /kandidat/:id (Populate fakultasId kode & nama, 404 bila tidak ditemukan, 400 bila salah format)
exports.getById = async (req, res, next) => {
  try {
    const data = await Kandidat.findById(req.params.id).populate(
      'fakultasId',
      'kode nama'
    );
    if (!data) {
      throw errorHttp(404, 'Data kandidat tidak ditemukan');
    }
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// PUT /kandidat/:id (hanya field yang dikirim yang diubah, validasi schema tetap berjalan)
exports.update = async (req, res, next) => {
  try {
    const { noUrut, nama, jumlahPendukung, jalur, wakil, fakultasId } = req.body;

    const perubahan = {};
    if (noUrut !== undefined) perubahan.noUrut = noUrut;
    if (nama !== undefined) perubahan.nama = nama;
    if (jumlahPendukung !== undefined) perubahan.jumlahPendukung = jumlahPendukung;
    if (jalur !== undefined) perubahan.jalur = jalur;
    if (wakil !== undefined) perubahan.wakil = { nama: wakil.nama, nim: wakil.nim };
    if (fakultasId !== undefined) perubahan.fakultasId = fakultasId;

    const data = await Kandidat.findByIdAndUpdate(req.params.id, perubahan, {
      new: true,
      runValidators: true,
    }).populate('fakultasId', 'kode nama');

    if (!data) {
      throw errorHttp(404, 'Data kandidat tidak ditemukan');
    }
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// DELETE /kandidat/:id
exports.remove = async (req, res, next) => {
  try {
    const data = await Kandidat.findByIdAndDelete(req.params.id);
    if (!data) {
      throw errorHttp(404, 'Data kandidat tidak ditemukan');
    }
    res.status(200).json({ message: 'Data kandidat berhasil dihapus' });
  } catch (err) {
    next(err);
  }
};