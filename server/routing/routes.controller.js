'use strict';

const path = require('path');
const app = require('./../app');
const tmplPath = path.join(app.get('views'), 'index.ejs');

exports.get = (req, res) => {
  res.render(tmplPath, {auth:req.auth});
};