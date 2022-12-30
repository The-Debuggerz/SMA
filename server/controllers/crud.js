const { Post } = require('../models/index');

// ************************************************************************************************
// 🚀 C - Create Post 🚀
// ************************************************************************************************

exports.createPost = async (req, res) => {
  let text = req.body.text;

  let post = await new Post({ text, user: req.user._id }).save();

  return res.status(201).json(post.text);
};

// ************************************************************************************************
// 🚀 R - Read Post 🚀
// ************************************************************************************************

// . Not added read post exports here
// . Cause there is only 2 API used to read posts
// . 1 - To get logged in user posts & searched user posts
// . 2 - To get only following users posts to render on homepage
// . So decided to keep that exports with user profile

// ************************************************************************************************
// 🚀 U - Update Post 🚀
// ************************************************************************************************

exports.editPost = async (req, res) => {
  let findPost = await Post.findById(req.params.id).select(['_id', 'text', 'user']);
  return res.status(200).json(findPost);
};

exports.updatePost = async (req, res) => {
  // console.log('🚀 updatePost', req.body);

  let findPost = await Post.findById(req.body.postID).select(['_id', 'text', 'user']);

  if (findPost.user.toString() !== req.user._id.toString()) {
    return res.redirect('/');
  }

  await Post.findOneAndUpdate({ _id: req.body.postID }, { text: req.body.inputText }, { new: true });

  return res.status(201).json('Post Updated!');
};

// ************************************************************************************************
// 🚀 D - Delete Post 🚀
// ************************************************************************************************

exports.deletePost = async (req, res) => {
  let deletePost = await Post.deleteOne({ _id: req.body.postID, user: req.user._id });

  return res.status(202).json(deletePost);
};
