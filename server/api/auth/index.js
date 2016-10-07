'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./auth.controller');

router.route('/login')
  .get(controller.getLoginPage)
  .post(controller.performLogin);

router.route('/signup')
  .get(controller.getSignupPage)
  .post(controller.performSignup);

module.exports = router;