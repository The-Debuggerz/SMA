const { body } = require('express-validator');

const register = [
  body('sUserName').not().isEmpty().escape(),
  body('sEmail').isEmail().not().isEmpty(),
  body('sMobile').not().isEmpty(),
  body('sPassword').not().isEmpty()
];
const login = [
  body('sEmail').not().isEmpty(),
  body('sPassword').not().isEmpty()
];

const resetPassword = [
  body('sNewPassword').not().isEmpty()
];

const changePassword = [
  body('sOldPassword').not().isEmpty(),
  body('sNewPassword').not().isEmpty()
];

module.exports = {
  register,
  resetPassword,
  login,
  changePassword
};
