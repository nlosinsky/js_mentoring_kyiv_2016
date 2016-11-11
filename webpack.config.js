const FRONT_END = process.env.FRONT_END;

module.exports = require(`./fe_${FRONT_END}/webpack.${FRONT_END}.js`);