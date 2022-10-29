const jwt = require('jsonwebtoken');
const { User } = require('../models/index');

const authentication = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    console.log('token:', token);

    if (!token) {
      res.status(401).json({
        message: 'unauthorize route profile - please login',
        isLoggedIn: false,
      });
    } else {
      let verifyToken = jwt.verify(token, process.env.PRIVATE_KEY);
      // console.log('verifyTokenIs:', verifyToken);

      const user = await User.findById({
        _id: verifyToken._id,
      });
      // console.log('user:', user);
      if (!user) throw new Error('User not found');

      req.token = token;
      req.user = user;

      next();
    }
  } catch (error) {
    res.status(401).json({
      message: 'Unauthorized: No token provided by user',
      isLoggedIn: false,
    });
    console.log(error);
  }
};

module.exports = authentication;
