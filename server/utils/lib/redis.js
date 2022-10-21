const { createAdapter } = require('@socket.io/redis-adapter');
const { createClient } = require('redis');
const log = require('./log');
const _ = require('./helper');
class RedisClient {
  constructor() {
    this.pubSubOptions = {
      url: `redis://${process.env.REDIS_PUBSUB_HOST}:${process.env.REDIS_PUBSUB_PORT}`,
      username: process.env.REDIS_PUBSUB_USERNAME,
      password: process.env.REDIS_PUBSUB_PASSWORD,
      legacyMode: false,
    };
    this.clientOptions = {
      url: `redis://${process.env.REDIS_CLIENT_HOST}:${process.env.REDIS_CLIENT_PORT}`,
      username: process.env.REDIS_CLIENT_USERNAME,
      password: process.env.REDIS_CLIENT_PASSWORD,
      legacyMode: false,
    };
  }

  async initialize() {
    try {
      this.client = createClient(this.clientOptions);
      this.publisher = createClient(this.pubSubOptions);
      this.subscriber = createClient(this.pubSubOptions);
      await Promise.all([this.client.connect(), this.publisher.connect(), this.subscriber.connect()]);
      log.blue('Redis initialized ⚡');
      this.client.on('error', log.red);
      this.publisher.on('error', log.red);
      this.subscriber.on('error', log.red);
    } catch (error) {
      log.red(`${_.now()} Error Occurred on redis initialize. reason :${error.message}`);
    }
  }

  getAdapter() {
    return createAdapter(this.publisher, this.subscriber);
  }
}

module.exports = new RedisClient();
