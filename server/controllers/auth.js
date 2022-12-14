const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/index');

exports.signup = async (req, res) => {
  const { name, username, email, password, confirmPassword } = req.body;

  if (!name || !username || !email || !password || !confirmPassword) {
    return res.status(422).json({ error: 'Register field is empty' });
  } else if (password !== confirmPassword) {
    return res.status(422).json({ error: 'Password do not mactched' });
  }
  // console.log(req.body);

  let existingUser = await User.findOne({
    $or: [{ username: username }, { email: email }],
  });
  // console.log(existingUser);

  if (existingUser) {
    if (existingUser.username === username) {
      return res.status(422).json({ message: 'Username already in use' });
    } else {
      return res.status(422).json({ message: 'Email already in use' });
    }
  }

  let hashedPassword = await bcrypt.hash(password, 12);

  let newUser = new User({
    name,
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
  } catch (error) {
    res.status(400).json({ message: 'Could not create user, please try again.' });
    console.log(error, 'Could not create user, please try again.');
  }
  console.log(newUser);

  res.status(200).json({
    message: 'Registeration Succeful',
    _id: newUser.id,
    name: newUser.name,
    email: newUser.email,
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Login field is empty' });
  }

  let user = await User.findOne({ email: email });

  if (!user) {
    return res.status(400).json({ message: 'No account found with this Email' });
  }

  // console.log(user);

  try {
    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.log(error);
  }

  const accessToken = jwt.sign({ _id: user._id }, process.env.PRIVATE_KEY, {
    expiresIn: '1h',
  });
  // console.log(accessToken);

  res.cookie('jwtoken', accessToken, {
    maxAge: 3600000, // 1 hr
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: false,
  });

  res.status(200).json({
    message: 'Login Successfull',
    isLoggedIn: true,
    _id: user.id,
    username: user.username,
    email: user.email,
    token: accessToken,
  });
};

// exports.refresh = (req, res) => {
//   const cookies = req.cookies;

//   if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorize' });

//   const refreshToken = cookies.jwt;

//   jwt.verify(
//     refreshToken,
//     process.env.REFRESH_token_SECRET,

//     async function (err, decoded) {
//       if (err) return res.status(403).json({ message: 'Forbidden' });

//       const foundUser = await User.findOne({
//         username: decoded.username,
//       }).exec();

//       if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });

//       const accessToken = jwt.sign(
//         {
//           UserInfo: {
//             username: foundUser.username,
//             email: foundUser.email,
//           },
//         },
//         process.env.PRIVATE_KEY,
//         { expiresIn: '15m' }
//       );

//       res.json({ accessToken });
//     }
//   );
// };

exports.logout = (req, res) => {
  // const cookies = req.cookies;
  // console.log('cookies:', cookies);

  res.clearCookie('jwtoken', { domain: process.env.DOMAIN, path: '/' });
  res.status(200).json({ message: 'User Logout', isLoggedIn: false, token: null });
};
