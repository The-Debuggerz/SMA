const express = require('express');
const router = new express.Router();
const validators = require('./lib/validators');
const middleware = require('./lib/middleware');
const authService = require('./lib/services');

router.post('/register', validators.register, authService.register);
router.post('/login', validators.login, authService.login);

router.get(
  '/user/auth/logout/v1',
  middleware.isAuthenticated,
  authService.logout,
);

module.exports = router;
