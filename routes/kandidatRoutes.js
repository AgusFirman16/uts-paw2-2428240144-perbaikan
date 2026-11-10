const express = require('express');
const router = express.Router();
const c = require('../controllers/kandidatController');

router.post('/', c.create);
router.get('/', c.getAll);
router.get('/:id', c.getById);

module.exports = router;
