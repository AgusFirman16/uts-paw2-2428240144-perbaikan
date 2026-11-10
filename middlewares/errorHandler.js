function errorHttp(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

function notFoundHandler(req, res, next) {
  res.status(404).json({
    message: `Rute ${req.method} ${req.originalUrl} tidak ditemukan`,
  });
}

function errorHandler(err, req, res, next) {
  // 1. Body JSON rusak (400)
  if (err.type === 'entity.parse.failed' || (err instanceof SyntaxError && err.status === 400 && 'body' in err)) {
    return res.status(400).json({ message: 'Format JSON tidak valid' });
  }

  // 2. ID bukan ObjectId / CastError (400), tanpa menyebut nama model
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Format ID tidak valid' });
  }

  // 3. Pelanggaran Schema / ValidationError (400)
  if (err.name === 'ValidationError') {
    const detail = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      message: 'Data tidak valid',
      detail,
    });
  }

  // 4. Nilai unik bentrok / kode 11000 (409)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'data';
    return res.status(409).json({
      message: `Nilai ${field} sudah digunakan`,
    });
  }

  // 5. Galat yang dilempar sengaja (mis. data tidak ditemukan -> status sesuai)
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  // 6. Galat lain yang tidak terduga (500 tanpa stack trace di respons)
  console.error(err);
  return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
}

module.exports = { errorHttp, notFoundHandler, errorHandler };
