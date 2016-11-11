'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./tickets.controller');
const routesController = require('../../routing/routes.controller.js');

router.route('/available')
  .get(routesController.isAuthorized, controller.getAvailableTickets)
  .put(routesController.isAuthorized, controller.addUserTicket);

router.route('/my')
  .get(routesController.isAuthorized, controller.getUserTickets);

module.exports = router;