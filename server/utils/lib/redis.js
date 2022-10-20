const { createAdapter } = require('@socket.io/redis-adapter');
const { createClient } = require('redis');
class RedisClient {
  constructor() {
    this.pubSubOptions = {
      url: `redis://${process.env.PUBSUB_REDIS_HOST}:${process.env.PUBSUB_REDIS_PORT}`,
      username: process.env.PUBSUB_REDIS_USERNAME,
      password: process.env.PUBSUB_REDIS_PASSWORD,
      legacyMode: false,
    };
  }

  async initialize() {
    try {
      this.client = createClient(this.gameplayOptions);
      this.publisher = createClient(this.pubSubOptions);
      this.subscriber = createClient(this.pubSubOptions);
      await Promise.all([
        this.client.connect(),
        this.publisher.connect(),
        this.subscriber.connect(),
      ]);
      log.cyan('Redis initialized ⚡');
      this.client.on('error', log.red);
      this.publisher.on('error', log.red);
      this.subscriber.on('error', log.red);
    } catch (error) {
      log.red(
        `${_.now()} Error Occurred on redis initialize. reason :${
          error.message
        }`
      );
    }
  }

  getAdapter() {
    return createAdapter(this.publisher, this.subscriber);
  }
}

module.exports = new RedisClient();
