module.exports = {
  TOKEN: {
    LOCATION: {
      HEADER: 'x-access-token',
      COOKIE: 'accessToken'
    },
    SECRET: {
      KEY: 'superSecret',
      VALUE: 'test-secret'
    }
  },

  MODELS: {
    USER: 'User'
  },

  SERVER: {
    DEFAULT_IP: '0.0.0.0',
    PORT: 9000
  },

  ENV: {
    PROD: 'production',
    DEV: 'development'
  },

  TIMING: {
    AUTH_TOKEN_EXPIRATION: 60 * 60 * 4 // 4 hours
  },

  STATUS_CODES: {
    OK: {
      CODE: 200,
      description: 'Everything is working.'
    },
    CREATED: {
      CODE: 201,
      description: 'New resource has been created.'
    },
    NO_CONTENT: {
      CODE: 204,
      description: 'The resource was successfully deleted (no response body).'
    },
    NOT_MODIFIED: {
      CODE: 304,
      description: 'The date returned is cached data (data has not changed).'
    },
    BAD_REQUEST: {
      CODE: 400,
      description: 'The request was invalid or cannot be served. The exact error should be explained in the error payload, i.e., „The JSON is not valid“.'
    },
    UNAUTHORIZED: {
      CODE: 401,
      description: 'The request requires user authentication.'
    },
    FORBIDDEN: {
      CODE: 403,
      description: 'The server understood the request, but is refusing it or the access is not allowed.'
    },
    NOT_FOUND: {
      CODE: 404,
      description: 'There is no resource behind the URI.'
    },
    SERVER_ERROR: {
      CODE: 500,
      description: 'API developers should avoid this error. If an error occurs in the global catch blog, the stack trace should be logged and not returned as response.'
    }
  }
};