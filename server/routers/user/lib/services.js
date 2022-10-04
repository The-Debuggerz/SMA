const jwt = require('jsonwebtoken');
const { User } = require('../../../models/');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const bcrypt = require('bcryptjs');

const authService = {};
authService.register = async (req, res) => {
  try {
    req.body = _.pick(req.body, [
      'sUserName',
      'sEmail',
      'sPassword',
      'sMobile',
      'sGender',
    ]);

    const { sEmail } = req.body;
    const userExist = await User.findOne({ sEmail });
    if (userExist) {
      return res.reply(messages.custom.already_exists_email);
    }

    const userData = new User(req.body);
    const sToken = await userData.generateAuthToken();
    res.reply(
      messages.custom.user_create_success,
      { nExpiresIn: 3 * 60 * 1000 },
      { verification: sToken },
    );
  } catch (error) {
    log.error(`${_.now()} login api error! reason: ${error.message}`);
    return res.reply(messages.custom.server_error);
  }
};

authService.login = async (req, res) => {
  try {
    req.body = _.pick(req.body, ['sEmail', 'sPassword']);
    const { sEmail, sPassword } = req.body;
    const user = await User.findOne({ sEmail });
    if (!user) {
      return res.reply(messages.unauthorized());
    }
    const isMatch = await bcrypt.compare(sPassword, user.sPassword);
    if (!isMatch) {
      return res.reply(messages.unauthorized());
    }
    if (user.aTokens.length > 5) user.aTokens.shift();
    const token = await user.generateAuthToken();

    return res.reply(messages.success('Login'), {
      authorization: token,
    });
  } catch (error) {
    log.error(`${_.now()} login api error! reason: ${error.message}`);
    return res.reply(messages.custom.server_error);
  }
};

authService.logout = async (req, res) => {
  try {
    const sToken = req.header('Authorization');
    await User.updateOne(
      { _id: ObjectId(req.user._id) },
      { $pull: { aTokens: { sToken } } },
    );
    return res.reply(messages.success());
  } catch (error) {
    log.error(`${_.now()} logout api error! reason: ${error.message}`);
    return res.reply(messages.custom.server_error);
  }
};

module.exports = authService;
