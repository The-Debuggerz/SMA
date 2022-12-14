const express = require('express');
const router = express.Router();

const { googleOAuthHandler } = require('../googleOAuth/googleOAuthHandler');
const { login, signup, logout } = require('../controllers/auth');
const { userProfile, isLoggedIn, follow, unFollow, deleteProfile, createPost } = require('../controllers/user');

const authentication = require('../middleware/check-auth');

router.post('/login', login);

router.post('/register', signup);

router.get('/oauth/google', googleOAuthHandler);

router.use(authentication);

router.get('/profile/:id', userProfile);

router.get('/isLoggedIn', isLoggedIn);

router.get('/logout', logout);

router.put('/follow', follow);

router.put('/unfollow', unFollow);

router.delete('/profile/delete', deleteProfile);

router.post('/userPosts', createPost);

module.exports = router;
