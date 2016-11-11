'use strict';

const path = require('path');
const config = require('../config/environment');
const CONST = require('../constants/constants');

module.exports = (app) => {
  //API routes
  app.use(routeMiddleware(['/api']), require('./../api'));

  //Send index file on init
  app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'dist/index.html'));
  });

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
