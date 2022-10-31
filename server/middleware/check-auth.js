const jwt = require('jsonwebtoken');
const { User } = require('../models/index');

// const authentication = async (req, res, next) => {
//   try {
//     const token = req.cookies.jwtoken;
//     // console.log('token:', token);

//     if (!token) {
//       res.status(401).json({
//         message: 'unauthorize route profile - please login',
//         isLoggedIn: false,
//       });
//     } else {
//       let verifyToken = jwt.verify(token, process.env.PRIVATE_KEY);
//       // console.log('verifyTokenIs:', verifyToken);

//       const user = await User.findById({
//         _id: verifyToken._id,
//       });
//       // console.log('user:', user);
//       if (!user) throw new Error('User not found');

//       req.token = token;
//       req.user = user;

//       console.log('user-check-auth', user._id);

//       next();
//     }
//   } catch (error) {
//     res.status(401).json({
//       message: 'Unauthorized: No token provided by user',
//       isLoggedIn: false,
//     });
//     console.log(error);
//   }
// };

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
