const express = require('express');
const router = express.Router();

router.use('/employees', require('./staff'))
router.use('/', require('./swagger'));
module.exports = router;