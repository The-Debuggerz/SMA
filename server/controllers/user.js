const { Post, User, Likes, Comment } = require('../models/index');
const cloudinary = require('cloudinary').v2;
let streamifier = require('streamifier');

const multer = require('multer');
const upload = multer();

const TimeAgo = require('javascript-time-ago');
const en = require('javascript-time-ago/locale/en.json');

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

// ************************************************************************************************
// 🚀 Status of loggedIn User 🚀
// ************************************************************************************************

exports.isLoggedIn = async (req, res) => {
  let user = await User.findById(req.user._id).select(['username', 'picture']);

  return res.status(200).send({
    message: 'Login Successfull',
    isLoggedIn: true,
    _id: req.user._id,
    token: req.token,
    username: user.username,
    picture: user.picture,
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

    // Find Current users all post with comments
    const posts = await Post.aggregate([
      {
        $match: {
          user: user._id,
        },
      },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'post',
          as: 'comments',
          pipeline: [
            {
              $sort: {
                createdAt: -1,
              },
            },
            {
              $limit: 2,
            },
          ],
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    const postData = await processPostData(posts, req.user._id);

    const postCount = await Post.countDocuments({ user: user._id });

    const followerDetails = await User.find({ _id: { $in: user.followers } }).select(['name', 'username', 'picture']);
    const followingDetails = await User.find({ _id: { $in: user.following } }).select(['name', 'username', 'picture']);

    // Return User Profile Search via params
    if (req.user._id !== user._id) {
      const currentUser = await User.findById(req.user._id);
      let followStatus = false;

      if (currentUser.following.includes(user._id) && user.followers.includes(req.user._id)) {
        followStatus = true;
      }

      return res.status(200).json({ user, followStatus, postData, postCount, followerDetails, followingDetails });
    }
    // else return logged in user profile
    return res.status(200).json({ user, postData, postCount });
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

      let commentTime = await post.comments.map(comment => {
        return { time: timeAgo.format(comment.createdAt) };
      });

      return { ...post, likeCount, liked, likeStatus, time: timeAgo.format(post.createdAt), commentTime };
    })
  );

  return postData;
};

// ************************************************************************************************
// 🚀 Get Following Users Post 🚀
// ************************************************************************************************

exports.getFollowingUsersPost = async (req, res) => {
  let currentUser = await User.findById(req.user._id);

  let followingUsersPost = await Post.find({
    $or: [{ user: { $in: currentUser.following } }, { user: req.user._id }],
  })
    .populate([
      {
        path: 'user',
        select: 'name username picture',
      },
      {
        path: 'comments',
        options: { sort: { createdAt: -1 }, limit: 2 },
      },
    ])
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

    if (!currentUser.password || !targetUser.targetUser) {
      currentUser.following.push(targetUser._id);
      targetUser.followers.push(req.user._id);
    }

    const [_, target] = await Promise.all([currentUser.save(), targetUser.save()]);

    res.status(201).json({ target, followStatus: true });
  } catch (error) {
    console.log('🚀 191.error', error);

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
// 🚀 Comment - Create + Delete 🚀
// ************************************************************************************************

exports.postComment = async (req, res) => {
  if (!req.body.commentText && !req.body.gifLink) return;

  let findUser = await User.findById(req.user._id).select(['name', 'username', 'picture']);

  try {
    const comment = new Comment({
      name: findUser.name,
      username: findUser.username,
      picture: findUser.picture,
      text: req.body.commentText ? req.body.commentText : null,
      gifUrl: req.body.gifLink ? req.body.gifLink : null,
      post: req.body.postId,
      user: req.user._id,
    });

    await comment.save();

    const post = await Post.findById(req.body.postId);

    post.comments.push(comment._id);

    await post.save();

    return res.status(200).json(comment);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteComment = async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return res.status(404).json('Comment not found');
  }

  // Check if the user is the author of the comment
  if (comment.user.toString() !== req.user._id) {
    return res.status(403).json('You are not authorized to delete this comment');
  }

  await Comment.findByIdAndDelete(req.params.id);
  return res.status(200).json('Comment Deleted');
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

// ************************************************************************************************
// 🚀 Search User Via Search Bar 🚀
// ************************************************************************************************

exports.serachUser = async (req, res) => {
  const { q } = req.query;

  const users = await User.find({ $text: { $search: q } }).select(['name', 'username', 'picture']);

  if (users.length === 0) {
    return res.json({ found: false });
  }

  return res.status(200).json({ users, found: true });
};

exports.updateProfilePic = (req, res) => {
  //
  upload.single('image')(req, res, async () => {
    if (!req.file) return;
    //
    let imageUrl = null;
    let imagePublicId = null;

    let uploadPromise = new Promise((resolve, reject) => {
      let cld_upload_stream = cloudinary.uploader.upload_stream({ resource_type: 'image', folder: `sma/${req.user.username}` }, (err, image) => {
        if (err) {
          return res.status(500).send('Error saving file to Cloudinary');
        }

        imageUrl = image.secure_url;
        imagePublicId = image.public_id;
        resolve();
      });

      streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
    });

    await uploadPromise;

    let findUser = await User.findById(req.user._id).select(['_id', 'picture']);

    if (findUser._id.toString() !== req.user._id.toString()) {
      return res.redirect('/');
    }

    await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        picture: imageUrl,
        imagePublicId: imagePublicId,
      },
      { new: true }
    );

    return res.status(201).json('Profile Updated!');
  });
};

// ************************************************************************************************
// 🚀 Show Single Post 🚀
// ************************************************************************************************

exports.singlePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate([
      {
        path: 'user',
        select: 'name username picture',
      },
      {
        path: 'comments',
        options: { sort: { createdAt: -1 } },
      },
    ]);

    if (!post) {
      return res.json('No Post Found');
    }

    const [{ likeCount, likeStatus, time }] = await processPostData([post], req.user._id);

    let commentTime = post.comments.map(comment => {
      return { time: timeAgo.format(comment.createdAt) };
    });

    return res.status(200).json({ post, time: timeAgo.format(post.createdAt), commentTime, likeCount, likeStatus, time });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ************************************************************************************************
// 🚀 Show All Users Post 🚀
// ************************************************************************************************

exports.allPost = async (req, res) => {
  let posts = await Post.find()
    .populate([
      {
        path: 'user',
        select: 'name username picture',
      },
      {
        path: 'comments',
        options: { sort: { createdAt: -1 }, limit: 2 },
      },
    ])
    .sort({ createdAt: -1 });

  const postData = await processPostData(posts, req.user._id);

  return res.status(200).json({ user: postData });
};
