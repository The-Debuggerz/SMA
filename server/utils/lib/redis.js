const Redis = require('ioredis');

// Connect to Redis
const redis = new Redis(process.env.REDIS);

module.exports = redis;
