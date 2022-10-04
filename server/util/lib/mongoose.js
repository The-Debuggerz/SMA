const { connect, set } = require('mongoose');

class MongoClient {
  constructor() {
    this.options = {
      bufferCommands: true,
      autoIndex: true,
      autoCreate: true,
    };
  }

  async initialize() {
    set('bufferTimeoutMS', 2000); // 500 => 2000
    await connect(process.env.DB_URL, this.options);
    log.blue('Mongoose Initialized ◙');
  }
}
module.exports = new MongoClient();
