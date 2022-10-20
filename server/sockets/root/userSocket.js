const { log, _ } = require('../../utils/');

class PlayerSocket {
  constructor(socket) {
    this.socket = socket;
    this.iUserId = socket.user.iUserId;
    this.setEventListeners();
    log.blue(
      `${_.now()} client: ${this.iUserId} connected with socketId : ${
        this.socket.id
      }`
    );
  }
  setEventListeners() {
    this.socket.on('ping', this.ping.bind(this));
    this.socket.on('reqRoomJoin', this.reqRoomJoin.bind(this));
    this.socket.on('disconnect', this.disconnect.bind(this));
    this.socket.on('error', (error) => log.red('socket error', error));
  }
  ping(body, callback) {
    callback(null, {});
  }
  /**
   * @param -> data { iRoomId }
   */
  async reqRoomJoin({ iRoomId }, callback) {
    log.blue('Room Joining Started!');
  }

  async disconnect() {
    log.red(`disconnected ::, ${this.iUserId} - ${this.socket.id}`);
  }

  logError(error, callback = () => {}) {
    log.trace(error);
    callback(error);
  }
}

module.exports = PlayerSocket;
