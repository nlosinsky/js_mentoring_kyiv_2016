'use strict';

const CONST = require('../../constants/constants');

const path = require('path');
const dotenv = require('dotenv');
const envPath = path.join(__dirname, '../../../.env');

dotenv.config({path: envPath});

// All configurations will extend these options
// ============================================
let all = {
  env: process.env.NODE_ENV,
  root: path.join(path.dirname(require.main.filename), '../'),
  port: process.env.PORT || CONST.SERVER.PORT,
  ip: process.env.IP || CONST.SERVER.DEFAULT_IP,
  secret: CONST.TOKEN.SECRET.VALUE,
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = Object.assign(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});
