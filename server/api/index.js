'use strict';

const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/tickets', require('./tickets'));

module.exports = router;
