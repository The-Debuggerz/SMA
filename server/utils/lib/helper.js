/* eslint-disable no-console */
const crypto = require('crypto');
const queryString = require('querystring');

// const jwt = require('jsonwebtoken');
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
_.toString = function (key) {
  try {
    return key.toString();
  } catch (error) {
    return '';
  }
};

_.pick = function (obj, array) {
  const clonedObj = this.clone(obj);
  return array.reduce((acc, elem) => {
    if (elem in clonedObj) acc[elem] = clonedObj[elem];
    return acc;
  }, {});
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

_.now = () => {
  const dt = new Date();
  return `[${`${dt}`.split(' ')[4]}:${dt.getMilliseconds()}]`;
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

// _.encodeToken = function (body, expTime) {
//   try {
//     return expTime
//       ? jwt.sign(this.clone(body), config.JWT_SECRET, expTime)
//       : jwt.sign(this.clone(body), config.JWT_SECRET);
//   } catch (error) {
//     return undefined;
//   }
// };

// _.decodeToken = function (token) {
//   try {
//     return jwt.decode(token, config.JWT_SECRET);
//   } catch (error) {
//     return undefined;
//   }
// };

// _.verifyToken = function (token) {
//   try {
//     return jwt.verify(token, config.JWT_SECRET, function (err, decoded) {
//       return err ? err.message : decoded; // return true if token expired
//     });
//   } catch (error) {
//     return error ? error.message : error;
//   }
// };

_.isOtpValid = function (createdAt) {
  const difference = new Date() - createdAt;
  return difference < process.env.OTP_VALIDITY;
};

_.handleCatchError = error => {
  log.red(`${_.now()} ----------ERROR--------- ${error}`);
  return res.reply(messages.custom.server_error);
};

_.request = (body, options, callback) => {
  const httpRequest = options.isSecure ? https : http;
  delete options.isSecure;
  const req = httpRequest.request(options, function (res) {
    const chunks = [];

    res.on('data', chunk => chunks.push(chunk));
    res.on('error', error => callback(error));
    res.on('end', () => callback(null, _.parse(Buffer.concat(chunks))));
  });

  const requetsBody = options.headers['Content-Type'] === 'application/x-www-form-urlencoded' ? queryString.stringify(body) : _.stringify(body);
  req.write(requetsBody);
  req.end();
};
_.searchRegex = search => {
  if (!search) {
    return '';
  }
  return search
    .replace(/\\/g, '\\\\')
    .replace(/\$/g, '\\$')
    .replace(/\*/g, '\\*')
    .replace(/\+/g, '\\+')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/\)/g, '\\)')
    .replace(/\(/g, '\\(')
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"');
};

_.delay = ttl => new Promise(resolve => setTimeout(resolve, ttl));

_.errorCallback = (error, response) => {
  if (error) console.error(error);
};

_.getRoomKey = iRoomId => `r:${iRoomId.toString()}`;

_.getUserKey = (iRoomId, iUserId) => `r:${iRoomId}:u:${iUserId}`;

module.exports = _;
