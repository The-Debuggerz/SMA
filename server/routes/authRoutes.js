const express = require('express');
const router = express.Router();

const { googleOAuthHandler } = require('../controllers/sessions');
const { login, signup, refresh, logout } = require('../controllers/auth');
const { profile, profileByUsername, isLoggedIn, userPosts, isFollow, deleteProfile } = require('../controllers/user');
const { User } = require('../models/index');

const authentication = require('../middleware/check-auth');

router.get('/sessions/oauth/google', googleOAuthHandler);

router.post('/login', login);

router.post('/register', signup);

router.get('/user/:id', profileByUsername);

router.use(authentication);

router.get('/profile', profile);

router.get('/posts', userPosts);

router.get('/isLoggedIn', isLoggedIn);

router.get('/refresh', refresh);

router.get('/logout', logout);

router.get('/refresh', refresh);

router.put('/follow', isFollow);

router.delete('/profile/delete', deleteProfile);

module.exports = router;
