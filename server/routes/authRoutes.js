const express = require('express');
const router = express.Router();

const { googleOAuthHandler } = require('../controllers/sessions');
const { login, signup, refresh, logout } = require('../controllers/auth');
const { profile, isLoggedIn, userPosts } = require('../controllers/user');

const authentication = require('../middleware/check-auth');

router.get('/api/sessions/oauth/google', googleOAuthHandler);

router.post('/api/login', login);

router.post('/api/register', signup);

router.use(authentication);

router.get('/api/profile', profile);

router.get('/api/posts', userPosts);

router.get('/api/isLoggedIn', isLoggedIn);

router.get('/api/refresh', refresh);

router.get('/api/logout', logout);

module.exports = router;
