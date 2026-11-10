// seed.js
// Mengisi basis data dengan data Fakultas dan Kandidat sesuai Topik 26 (Pemilihan Raya Kampus)
require('dotenv').config();
const mongoose = require('mongoose');
const Fakultas = require('./models/Fakultas');
const Kandidat = require('./models/Kandidat');

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  await Kandidat.deleteMany({});
  await Fakultas.deleteMany({});

  const fakultas = await Fakultas.insertMany([
    { kode: 'FIKR', nama: 'Fakultas Ilmu Komputer dan Rekayasa' },
    { kode: 'FEB', nama: 'Fakultas Ekonomi dan Bisnis' },
  ]);

  const kandidat = await Kandidat.insertMany([
    {
      noUrut: '01',
      nama: 'Agus Firman',
      jumlahPendukung: 120,
      jalur: 'independen',
      wakil: { nama: 'Rionaldy Wijaya', nim: '2428240143' },
      fakultasId: fakultas[0]._id,
    },
    {
      noUrut: '02',
      nama: 'Budi Santoso',
      jumlahPendukung: 250,
      jalur: 'partai',
      wakil: { nama: 'Siti Aminah', nim: '2428240150' },
      fakultasId: fakultas[1]._id,
    },
    {
      noUrut: '03',
      nama: 'Citra Lestari',
      jumlahPendukung: 180,
      jalur: 'ormawa',
      wakil: { nama: 'Dimas Pratama', nim: '2428240160' },
      fakultasId: fakultas[0]._id,
    },
  ]);

  console.log(`Seed selesai: ${fakultas.length} fakultas, ${kandidat.length} kandidat`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
