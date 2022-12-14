const { Post } = require('../models/index');
const { User } = require('../models/index');

const TimeAgo = require('javascript-time-ago');
const en = require('javascript-time-ago/locale/en.json');

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

// Status of loggedIn User
exports.isLoggedIn = async (req, res) => {
  let user = await User.findById(req.user._id).select('username');

  return res.status(200).send({
    message: 'Login Successfull',
    isLoggedIn: true,
    token: req.token,
    username: user.username,
  });
};

// LoggedIN User Profile - && - Searched User Profile
exports.userProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.id }).select(['name', 'username', 'following', 'followers', 'picture']);

    if (!user) {
      return res.status(401).json({ message: 'There is no profile for this user' });
    }

    let posts = await Post.find({ user: user._id }).select(['_id', 'text', 'user', 'createdAt']).sort({ createdAt: -1 });

    let postData = posts.map(post => {
      return { ...post, time: timeAgo.format(post.createdAt) };
    });

    if (req.user._id !== user._id) {
      const currentUser = await User.findById(req.user._id);
      let followStatus = false;

      if (currentUser.following.includes(user._id) && user.followers.includes(req.user._id)) {
        followStatus = true;
      }

      return res.status(200).json({ user, followStatus, postData });
    }

    return res.status(200).json({ user, postData });
  } catch (error) {
    console.log(error);
    res.status(500).send('server error');
  }
};

// Create Post
exports.createPost = (req, res) => {
  let text = req.body.text;
  new Post({ text, user: req.user }).save();

  return res.status(200).json({ message: 'Posted Successfully' });
};

// Delete User Profile
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

// *******************************************************************************************
// Follow And UnFollow User
// *******************************************************************************************

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