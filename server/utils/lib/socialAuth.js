const _ = require('./helper');

const services = {
  googleLogin: ({ idToken }, callback) => {
    const options = {
      method: 'GET',
      hostname: `oauth2.googleapis.com`,
      path: `/tokeninfo?id_token=${idToken}`,
      headers: { 'Content-Type': 'application/json' },
      isSecure: true,
      rejectUnauthorized: false,
    };

    _.request({}, options, (error, response) => {
      if (error) return callback(error);
      const userData = {
        sEmail: response.email,
        sGoogleId: response.sub,
      };
      callback(null, userData);
    });
  },
};

module.exports = services;
