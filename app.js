require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const logger = require('./middlewares/logger');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');

const fakultasRoutes = require('./routes/fakultasRoutes');
const kandidatRoutes = require('./routes/kandidatRoutes');

const app = express();

// ---------- Middleware global ----------
app.use(logger);
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST'],
  })
);
app.use(express.json());

// ---------- Route dasar ----------
app.get('/', (req, res) => {
  res.json({ message: 'Server RESTful API Pemilihan Raya Kampus berjalan!' });
});

// ---------- Route per modul ----------
app.use('/fakultas', fakultasRoutes);
app.use('/kandidat', kandidatRoutes);

// ---------- Handler 404 dan error handler (paling akhir) ----------
app.use(notFoundHandler);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Terhubung ke MongoDB');
    app.listen(process.env.PORT, () =>
      console.log(`Server berjalan di http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.error('Gagal terhubung ke MongoDB:', err.message);
    process.exit(1);
  });
