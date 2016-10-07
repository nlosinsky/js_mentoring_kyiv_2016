'use strict';

const path = require('path');
const dotenv = require('dotenv');
const envPath = path.join(__dirname, '../../../.env');

dotenv.config({ path: envPath });

// All configurations will extend these options
// ============================================
let all = {
    env: process.env.NODE_ENV,

    // Root path of server
    root: path.normalize(__dirname + '/../../..'),

    // Server port
    port: process.env.PORT || 9000,

    // Server IP
    ip: process.env.IP || '0.0.0.0',


    secret: 'test-secret',

    // MongoDB connection options
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
