const express = require('express');
const router = express.Router();

const { googleOAuthHandler } = require('../controllers/sessions');
const { login, signup, refresh, logout } = require('../controllers/auth');
const { profile, isLoggedIn, userPosts } = require('../controllers/user');

const authentication = require('../middleware/check-auth');

router.get('/sessions/oauth/google', googleOAuthHandler);

router.post('/login', login);

router.post('/register', signup);

router.use(authentication);

router.get('/profile', profile);

router.get('/posts', userPosts);

router.get('/isLoggedIn', isLoggedIn);

router.get('/refresh', refresh);

router.get('/logout', logout);

module.exports = router;
