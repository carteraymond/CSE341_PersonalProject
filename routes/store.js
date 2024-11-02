const express = require('express');
const router = express.Router();
const StoreController = require('../controllers/Stores');

router.get('/', StoreController.getAll);

router.get('/:id', StoreController.getSingle);

module.exports = router;