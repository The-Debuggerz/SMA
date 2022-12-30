const express = require('express');
const router = express.Router();

const { googleOAuthHandler } = require('../googleOAuth/googleOAuthHandler');
const { login, signup, logout } = require('../controllers/auth');
const authentication = require('../middleware/check-auth');

router.post('/login', login);

router.post('/register', signup);

router.get('/oauth/google', googleOAuthHandler);

router.use(authentication);

router.get('/logout', logout);

module.exports = router;
