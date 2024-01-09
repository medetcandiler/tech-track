const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) { // !origin for development
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // inlclude credentials like cookies, HTTP auth
}

module.exports = corsOptions;