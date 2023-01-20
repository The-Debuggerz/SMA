const express = require('express');
const router = express.Router();

const {
  isLoggedIn,
  userProfile,
  getFollowingUsersPost,
  follow,
  unFollow,
  like,
  unlike,
  postComment,
  deleteProfile,
  serachUser,
  updateProfilePic,
  singlePost,
  deleteComment,
} = require('../controllers/user');

const authentication = require('../middleware/check-auth');

router.use(authentication);

router.get('/isLoggedIn', isLoggedIn);

router.get('/profile/:id', userProfile);

router.get('/followingUsersPost', getFollowingUsersPost);

router.put('/follow', follow);

router.put('/unfollow', unFollow);

router.post('/like', like);

router.delete('/unlike', unlike);

router.post('/post-comment', postComment);

router.delete('/profile/delete', deleteProfile);

router.get('/search', serachUser);

router.put('/update-profile-pic', updateProfilePic);

router.get('/single-post/:id', singlePost);

router.delete('/delete-comment/:id', deleteComment);

module.exports = router;
