const jwt = require('jsonwebtoken');

const privateKey = process.env.PRIVATE_KEY;
const publicKey = process.env.PUBLIC_KEY;

exports.signJwt = (object, options) => {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

exports.verifyJwt = (token) => {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e) {
    console.error(e);
    return {
      valid: false,
      expired: e.message === 'jwt expired',
      decoded: null,
    };
  }
};
