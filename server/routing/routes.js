'use strict';

const path = require('path');
const routesController = require('./routes.controller.js');
const authService = require('../services/authStatus');

module.exports = (app) => {
  app.all('*', (req, res, next) => {
    authService.auth(req).then((resp) => {
      req.auth = resp;
      next();
    });
  });

  //Home route
  app.route(['', '/'])
    .get(routesController.get);

  //API routes
  app.use('/api', require('./../api'));
};
