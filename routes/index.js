const express = require('express');
const router = express.Router();

router.use('/employees', require('./staff'))
router.use('/stores', require('./store'))
router.use('/', require('./swagger'));
module.exports = router;