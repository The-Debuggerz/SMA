const { Post } = require('../models/index');

exports.profile = async (req, res) => {
  // console.log('req.user-profile', req.user);
  // console.log('req.cookie-profile:', req.cookies.jwtoken);
  return res.send(req.user);
};

exports.isLoggedIn = async (req, res) => {
  return res.status(200).send({
    message: 'Login Successfull',
    isLoggedIn: true,
    token: req.token,
  });
};

exports.userPosts = async (req, res) => {
  if (req.user) {
    Post.find({}).then((data) => {
      console.log(`Sending ${data.length} Post Packets!`);
      console.log(data);
      res.json(data);
    });
  } else {
    res.status(401).json({ message: 'unauthoroze' });
  }
};
