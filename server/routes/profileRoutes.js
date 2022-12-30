const express = require('express');
const router = express.Router();

const { isLoggedIn, userProfile, getFollowingUsersPost, follow, unFollow, like, unlike, deleteProfile } = require('../controllers/user');

const authentication = require('../middleware/check-auth');

router.use(authentication);

router.get('/isLoggedIn', isLoggedIn);

router.get('/profile/:id', userProfile);

router.get('/followingUsersPost', getFollowingUsersPost);

router.put('/follow', follow);

router.put('/unfollow', unFollow);

router.post('/like', like);

router.delete('/unlike', unlike);

router.delete('/profile/delete', deleteProfile);

module.exports = router;
