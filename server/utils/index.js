const connectDB = require('./lib/mongodb');
const log = require('./lib/log');
// const redis = require('./lib/redis');

module.exports = {
  connectDB,
  log,
  // redis,
};
