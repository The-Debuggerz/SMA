const connectDB = require('./lib/mongodb');
const cloudinary = require('./lib/cloudinary');
const log = require('./lib/log');
// const redis = require('./lib/redis');

module.exports = {
  connectDB,
  cloudinary,
  log,
  // redis,
};
