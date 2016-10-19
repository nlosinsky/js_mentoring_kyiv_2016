'use strict';

const path = require('path');
const routesController = require('./routes.controller.js');
const authService = require('../services/authStatus');
const config = require('../config/environment');
const CONST = require('../constants/constants');

module.exports = (app) => {
  app.all('*', (req, res, next) => {
    authService.auth(req).then((resp) => {
      req.auth = resp;
      next();
    });
  });

  //Home route
  app.route(routeMiddleware(['', '/']))
    .get(routesController.get);

  //API routes
  app.use(routeMiddleware(['/api']), require('./../api'));


  /**
   *
   * @param {Array} paths
   * @returns {Array}
   * @description added only for development environment to allow the user to use `webpack-dev-server` features
   */
  function routeMiddleware(paths) {
    let possibleRoutes = [];

    paths.forEach((path) => {
      possibleRoutes.push(path);

      if (config.env === CONST.ENV.DEV) {
        possibleRoutes.push(`/webpack-dev-server${path}`);
      }
    });

    return possibleRoutes;
  }

};
