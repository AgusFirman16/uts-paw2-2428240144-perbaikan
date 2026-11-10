const express = require('express');
const router = express.Router();
const c = require('../controllers/kandidatController');

router.post('/', c.create);
router.get('/', c.getAll);
router.get('/:id', c.getById);
router.put('/:id', c.update);      // baru
router.delete('/:id', c.remove);   // baru

module.exports = router;