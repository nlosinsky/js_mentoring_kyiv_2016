'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./auth.controller');

router.route('/login')
  .post(controller.performLogin);

router.route('/signup')
  .post(controller.performSignup);

router.route('/check')
  .get(controller.isTokenValid);

module.exports = router;