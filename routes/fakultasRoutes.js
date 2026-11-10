const express = require('express');
const router = express.Router();
const c = require('../controllers/fakultasController');

router.post('/', c.create);
router.get('/', c.getAll);

module.exports = router;
