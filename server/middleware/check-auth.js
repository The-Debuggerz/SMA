const jwt = require('jsonwebtoken');

const authentication = async (req, res, next) => {
  const token = req.cookies.jwtoken;
  console.log('token:', token);

  if (!token) {
    return res.status(401).json({
      message: 'No token, Authorization failed!',
    });
  }

  try {
    jwt.verify(token, process.env.PRIVATE_KEY, function (err, decoded) {
      if (err) {
        console.log('check-auth', 'JWT Token Expired');
        console.log('check-auth-decoded', decoded);
        return res.status(401).json({ name: 'TokenExpiredError', message: 'jwt expired' });
      }

      req.token = token;
      req.user = decoded;

      next();
    });
  } catch (error) {
    console.log('check-auth error', error);
    res.status(401).json({
      message: 'Unauthorized: token invalid',
    });
  }
};
module.exports = authentication;
