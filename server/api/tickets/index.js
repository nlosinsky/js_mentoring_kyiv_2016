'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./tickets.controller');

router.route('')
  .get(controller.getAvailableTickets)
  .put(controller.addUserTicket);

router.route('/my')
  .get(controller.getUserTickets);

module.exports = router;