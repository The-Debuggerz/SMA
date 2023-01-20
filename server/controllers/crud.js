const { Post, Comment } = require('../models/index');
const cloudinary = require('cloudinary').v2;
let streamifier = require('streamifier');

const multer = require('multer');
const upload = multer();

// ************************************************************************************************
// 🚀 C - Create Post 🚀
// ************************************************************************************************

exports.createPost = async (req, res) => {
  //
  upload.single('image')(req, res, async () => {
    let text = req.body.text;
    if (!text && !req.file) return;

    let imageUrl = null;
    let imagePublicId = null;

    if (req.file) {
      //
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
    }

    let post = new Post({
      text: text ? text : null,
      image: imageUrl,
      imagePublicId: imagePublicId,
      user: req.user._id,
    });

    await post.save();
    return res.status(201).json(post);
  });
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
  let deletePost = await Post.findByIdAndDelete({ _id: req.body.postID, user: req.user._id });

  if (!deletePost) {
    return res.status(404).send('Post not found');
  }

  // Delete all comments associated with the post
  await Comment.deleteMany({ post: req.body.postID });

  if (deletePost.imagePublicId) {
    await cloudinary.uploader.destroy(deletePost.imagePublicId, (err, result) => {
      if (err) {
        console.log('🚀 destroy err', err);
        return res.status(500).json('Error deleting image from Cloudinary');
      }
      // Image deleted successfully
    });
    return res.status(200).json('Post deleted successfully');
  }

  return res.status(200).json('Post deleted successfully');
};
