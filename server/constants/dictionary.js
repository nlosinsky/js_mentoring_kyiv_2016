'use strict';

module.exports = {
  AUTH: {
    WRONG_TOKEN: 'Failed to authenticate token.',
    NO_TOKEN: 'You are not authorized. No token provided.',
    USER_NOT_FOUND: 'Authentication failed. User not found.',
    WRONG_PASSWORD: 'Authentication failed. Wrong password.',
    REQUIRED_USERNAME_PASSWORD: 'User and Password fields are required!',
    SUCCESS: 'Enjoy your token!',
  },

  MONGOOSE: {
    DISCONNECTED: 'Mongoose default connection disconnected'
  }
};


module.exports.PARAMS = {
  SERVER: {
    /**
     *
     * @param port
     * @param environment
     * @returns {string}
     */
    LISTENING: (port, environment) => {
      return `Express server listening on ${port}, in ${environment} mode`;
    }
  },
  BUYING: {
    /**
     *
     * @param productId
     * @returns {string}
     */
    TICKET_WAS_BOUGHT: (productId) => {
      return `Success! Ticket #${productId} was bought.`;
    }
  },

  MONGOOSE: {
    /**
     *
     * @param {Error} error
     * @returns {string}
     */
    ERROR: (error) =>{
      return `Mongoose default connection error  ${error}`;
    },
    /**
     *
     * @param {string} uri
     * @returns {string}
     */
    CONNECTED: (uri) => {
      return `Mongoose default connection open to ${uri}`;
    }
  }
};