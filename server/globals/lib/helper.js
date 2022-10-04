/* eslint-disable no-console */
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const _ = {};

const config = {
  BASE_URL: process.env.BASE_URL,
  VERIFICATION_CODE_LENGTH: process.env.VERIFICATION_CODE_LENGTH,
  JWT_SECRET: process.env.JWT_SECRET,
};

_.parse = function (data) {
  try {
    return JSON.parse(data);
  } catch (error) {
    return data;
  }
};

_.stringify = function (data, offset = 0) {
  return JSON.stringify(data, null, offset);
};

_.pick = function (obj, array) {
  const clonedObj = this.clone(obj);
  return array.reduce((acc, elem) => {
    if (elem in clonedObj) acc[elem] = clonedObj[elem];
    return acc;
  }, {});
};

_.isEmptyObject = function (obj = {}) {
  return !Object.keys(obj).length;
};

_.formattedDate = function () {
  return new Date().toLocaleString('en-us', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};

_.isoTimeString = function () {
  const today = new Date();
  return today;
};

_.getDate = function (_date = undefined, currentTime = false) {
  const date = _date ? new Date(_date) : new Date();
  if (!currentTime) date.setHours(0, 0, 0, 0);
  return new Date(date - date.getTimezoneOffset() * 60000);
};

_.addDays = function (date, days) {
  const inputDate = new Date(date);
  return new Date(inputDate.setDate(inputDate.getDate() + days));
};

_.addMonth = function (date, month) {
  const inputDate = new Date(date);
  return new Date(inputDate.setMonth(inputDate.getMonth() + month));
};

_.addMilliseconds = function (date, milliseconds) {
  const inputDate = new Date(date);
  return new Date(inputDate.valueOf() + milliseconds);
};

_.encryptPassword = function (password) {
  return crypto
    .createHmac('sha256', config.JWT_SECRET)
    .update(password)
    .digest('hex');
};

_.salt = function (length, type) {
  if (process.env.NODE_ENV !== 'prod') return 1234;
  if (type === 'string') {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length);
  }

  let min = 1;
  let max = 9;
  for (let i = 1; i < length; i += 1) {
    min += '0';
    max += '9';
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
_.now = () => {
  const dt = new Date();
  return `[${`${dt}`.split(' ')[4]}:${dt.getMilliseconds()}]`;
};
_.sortByKey = (array, key) => _.clone(array).sort((a, b) => a[key] - b[key]);

_.clone = function (data = {}) {
  const originalData = data.toObject ? data.toObject() : data; // for mongodb result operations
  const eType = originalData ? originalData.constructor : 'normal';
  if (eType === Object) return { ...originalData };
  if (eType === Array) return [...originalData];
  return data;
};
_.randomCode = function (size) {
  const code = Date.now().toString(36);
  return code.slice(code.length - size);
};

_.encodeToken = function (body, expTime) {
  try {
    return expTime
      ? jwt.sign(this.clone(body), config.JWT_SECRET, expTime)
      : jwt.sign(this.clone(body), config.JWT_SECRET);
  } catch (error) {
    return undefined;
  }
};

_.decodeToken = function (token) {
  try {
    return jwt.decode(token, config.JWT_SECRET);
  } catch (error) {
    return undefined;
  }
};

_.verifyToken = function (token) {
  try {
    return jwt.verify(token, config.JWT_SECRET, function (err, decoded) {
      return err ? err.message : decoded; // return true if token expired
    });
  } catch (error) {
    return error ? error.message : error;
  }
};

_.isOtpValid = function (createdAt) {
  const difference = new Date() - createdAt;
  return difference < process.env.OTP_VALIDITY;
};

_.isEmail = function (email) {
  const regeX = /[a-z0-9._%+-]+@[a-z0-9-]+[.]+[a-z]{2,5}$/;
  return !regeX.test(email);
};

_.isUserName = function (name) {
  const regeX = /^[a-zA-Z ]+$/;
  return !regeX.test(name);
};

_.isPassword = function (password) {
  const regeX =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/;
  return !regeX.test(password);
};

_.delay = (ttl) => new Promise((resolve) => setTimeout(resolve, ttl));

// eslint-disable-next-line n/handle-callback-err
_.emptyCallback = (error, response) => {};

_.errorCallback = (error, response) => {
  if (error) console.error(error);
};

module.exports = _;
