const os = require('node:os');

const { Post } = require('../models/index');
const { User } = require('../models/index');

exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send('server error');
  }
};

exports.profileByUsername = async (req, res) => {
  console.log('req.user._id', req.user._id);
  try {
    const user = await User.findOne({ username: req.params.id }).select(['name', 'username', 'following', 'followers']);

    if (!user) {
      return res.status(401).json({ message: 'There is no profile for this user' });
    }

    const currentUser = await User.findById(req.user._id);
    let followStatus = false;

    if (currentUser.following.includes(user._id) && user.followers.includes(req.user._id)) {
      followStatus = true;
    }

    res.json({ user, followStatus });
  } catch (error) {
    console.log(error);
    res.status(500).send('server error');
  }
};

// Delete Profile
exports.deleteProfile = async (req, res) => {
  try {
    const profile = await User.findOneAndRemove({ _id: req.user._id });

    if (!profile) {
      console.log('There is no profile for this user');
      return res.status(401).json({ message: 'There is no profile for this user' });
    }

    res.json({ message: 'user profile deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).send('server error');
  }
};

// Status of loggedIn User
exports.isLoggedIn = async (req, res) => {
  return res.status(200).send({
    message: 'Login Successfull',
    isLoggedIn: true,
    token: req.token,
  });
};

// User Posts
exports.userPosts = async (req, res) => {
  if (req.user) {
    Post.find({}).then(data => {
      res.json(data);
    });
  } else {
    res.status(401).json({ message: 'unauthorize' });
  }
};

// Follow User
exports.follow = async (req, res) => {
  try {
    // User we want to follow
    const targetUser = await User.findOne({ username: req.body.username });

    if (!targetUser) {
      return res.status(404).json({
        error: true,
        message: 'User not found',
      });
    }

    const currentUser = await User.findById(req.user._id);

    if (currentUser.following.includes(targetUser._id) && targetUser.followers.includes(req.user._id)) {
      return res.status(200).json({ targetUser, message: 'Already Following', followStatus: true });
    }

    currentUser.following.push(targetUser._id);
    targetUser.followers.push(req.user._id);

    const [_, target] = await Promise.all([currentUser.save(), targetUser.save()]);

    res.status(201).json({ target, followStatus: true });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: 'Failed to follow user',
    });
  }
};

// Unfollow User
exports.unFollow = async (req, res) => {
  try {
    // User we want to unfollow
    const targetUser = await User.findOne({ username: req.body.username });

    if (!targetUser) {
      return res.status(404).json({
        error: true,
        message: 'User not found',
      });
    }

    const currentUser = await User.findById(req.user._id);

    currentUser.following.pull(targetUser._id);
    targetUser.followers.pull(req.user._id);

    const [_, target] = await Promise.all([currentUser.save(), targetUser.save()]);

    res.status(201).json({ target, followStatus: false });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: 'Failed to unfollow user',
    });
  }
};

exports.userDevice = async (req, res) => {
  let arch = os.arch();
  let type = os.type();
  let hostname = os.hostname();

  return res.status(200).json({ arch, type, hostname });
};
