const mongoose = require('mongoose');

const wakilSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: [true, 'nama wakil wajib diisi'],
      trim: true,
    },
    nim: {
      type: String,
      required: [true, 'nim wakil wajib diisi'],
      trim: true,
    },
  },
  { _id: false }
);

const kandidatSchema = new mongoose.Schema({
  noUrut: {
    type: String,
    required: [true, 'noUrut wajib diisi'],
    unique: true,
    trim: true,
  },
  nama: {
    type: String,
    required: [true, 'nama wajib diisi'],
    trim: true,
  },
  jumlahPendukung: {
    type: Number,
    required: [true, 'jumlahPendukung wajib diisi'],
    min: [0, 'jumlahPendukung minimal 0'],
  },
  jalur: {
    type: String,
    required: [true, 'jalur wajib diisi'],
    trim: true,
  },
  wakil: {
    type: wakilSchema,
    required: [true, 'wakil wajib diisi'],
  },
  fakultasId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fakultas',
    required: [true, 'fakultasId wajib diisi'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Kandidat', kandidatSchema);
