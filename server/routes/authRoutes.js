const express = require('express');
const router = express.Router();

const { googleOAuthHandler } = require('../controllers/sessions');
const { login, signup, refresh, logout } = require('../controllers/auth');
const { profile, isLoggedIn, userPosts, isFollow, deleteProfile } = require('../controllers/user');
const { User } = require('../models/index');

const authentication = require('../middleware/check-auth');

router.get('/api/sessions/oauth/google', googleOAuthHandler);

router.post('/api/login', login);

router.post('/api/register', signup);

router.get('/api/user/:id', profile);

router.use(authentication);

router.get('/api/posts', userPosts);

router.get('/api/isLoggedIn', isLoggedIn);

router.get('/api/refresh', refresh);

router.get('/api/logout', logout);

router.put('/api/follow', isFollow);

router.delete('/api/profile/delete', deleteProfile);

router.get('/api/profile', async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    console.log('🚀 ~ file: authRoutes.js ~ line 24 ~ router.get ~ user', user);

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send('server error');
  }
});

module.exports = router;
