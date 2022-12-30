const { Post, User, Likes } = require('../models/index');
// const redis = require('../utils/lib/redis');

const TimeAgo = require('javascript-time-ago');
const en = require('javascript-time-ago/locale/en.json');

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

// ************************************************************************************************
// 🚀 Status of loggedIn User 🚀
// ************************************************************************************************

exports.isLoggedIn = async (req, res) => {
  let user = await User.findById(req.user._id).select('username');

  return res.status(200).send({
    message: 'Login Successfull',
    isLoggedIn: true,
    _id: req.user._id,
    token: req.token,
    username: user.username,
  });
};

// ************************************************************************************************
// 🚀 Logged in User Profile - && - Searched User Profile 🚀
// ************************************************************************************************

exports.userProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.id }).select(['name', 'username', 'following', 'followers', 'picture']);

    if (!user) {
      return res.status(401).json({ message: 'There is no profile for this user' });
    }

    let posts = await Post.find({ user: user._id }).select(['_id', 'text', 'user', 'createdAt']).sort({ createdAt: -1 });
    const postData = await processPostData(posts, req.user._id);

    // Return User Profile Search via params
    if (req.user._id !== user._id) {
      const currentUser = await User.findById(req.user._id);
      let followStatus = false;

      if (currentUser.following.includes(user._id) && user.followers.includes(req.user._id)) {
        followStatus = true;
      }

      return res.status(200).json({ user, followStatus, postData });
    }
    // else return logged in user profile
    return res.status(200).json({ user, postData });
  } catch (error) {
    console.log(error);
    res.status(500).send('server error');
  }
};

// ************************************************************************************************
// 🚀 Helper Function 🚀
// ************************************************************************************************

const processPostData = async (userPost, userId) => {
  const postData = await Promise.all(
    userPost.map(async post => {
      // Use the Mongoose countDocuments function to count the number of likes for the post
      const likeCount = await Likes.countDocuments({ post: post._id });

      // Check if the current user has liked the post
      const liked = await Likes.exists({
        user: userId,
        post: post._id,
      });

      let likeStatus;
      if (liked !== null) {
        likeStatus = true;
      } else {
        likeStatus = false;
      }

      return { ...post, likeCount, liked, likeStatus, time: timeAgo.format(post.createdAt) };
    })
  );

  return postData;
};

// ************************************************************************************************
// 🚀 Get Following Users Post 🚀
// ************************************************************************************************

exports.getFollowingUsersPost = async (req, res) => {
  let currentUser = await User.findById(req.user._id);

  // Redis Cache
  // const redisCache = await redis.get(req.user._id);

  // if (redisCache) {
  //   console.log('🚀🚀 from cache');

  //   return res.status(200).json({
  //     user: JSON.parse(redisCache),
  //     from: 'redis',
  //   });
  // }

  let followingUsersPost = await Post.find({
    $or: [{ user: { $in: currentUser.following } }, { user: req.user._id }],
  })
    .populate('user', '_id name username')
    .sort({ createdAt: -1 });

  const postData = await processPostData(followingUsersPost, req.user._id);

  return res.status(200).json({ user: postData, from: 'remote' });
};

// *******************************************************************************************
// 🚀 Follow / UnFollow User 🚀
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

// ************************************************************************************************
// 🚀 Like / Unlike Post 🚀
// ************************************************************************************************

// Like a post
exports.like = async (req, res) => {
  try {
    const like = new Likes({
      user: req.user._id,
      post: req.body.postID,
    });
    await like.save();
    res.send(like);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Unlike a post
exports.unlike = async (req, res) => {
  try {
    await Likes.deleteOne({
      user: req.user._id,
      post: req.body.postID,
    });
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
};

// ************************************************************************************************
// 🚀 Delete User Profile 🚀
// ************************************************************************************************

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
