const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/index');

// ************************************************************************************************
// 🚀 Sign up 🚀
// ************************************************************************************************

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

// ************************************************************************************************
// 🚀 Login 🚀
// ************************************************************************************************

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Login field is empty' });
  }

  let user = await User.findOne({ email: email });

  if (!user) {
    return res.status(400).json({ message: 'No account found with this Email' });
  }

  try {
    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.log(error);
  }

  const accessToken = jwt.sign({ _id: user._id, username: user.username }, process.env.PRIVATE_KEY, {
    expiresIn: '12h',
  });

  res.cookie('jwtoken', accessToken, {
    maxAge: 43200000, // 12 hr
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

// ************************************************************************************************
// 🚀 Logout 🚀
// ************************************************************************************************

exports.logout = (req, res) => {
  res.cookie('jwtoken', { expires: Date.now(), domain: process.env.DOMAIN, path: '/' });
  res.end();
};
