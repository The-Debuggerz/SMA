const express = require('express');
const router = express.Router();

const { googleOAuthHandler } = require('../controllers/sessions');
const { login, signup, refresh, logout } = require('../controllers/auth');
const { profile, profileByUsername, isLoggedIn, userPosts, follow, unFollow, deleteProfile } = require('../controllers/user');

const authentication = require('../middleware/check-auth');

router.post('/login', login);

router.post('/register', signup);

router.get('/oauth/google', googleOAuthHandler);

router.use(authentication);

router.get('/profile', profile);

router.get('/user/:id', profileByUsername);

router.get('/posts', userPosts);

router.get('/isLoggedIn', isLoggedIn);

router.get('/refresh', refresh);

router.get('/logout', logout);

router.get('/refresh', refresh);

router.put('/follow', follow);

router.put('/unfollow', unFollow);

router.delete('/profile/delete', deleteProfile);

// router.get('/profile/settings', userDevice);

module.exports = router;
