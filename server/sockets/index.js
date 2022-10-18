const socketIO = require('socket.io');
const root = require('./root/rootSocket');
const { log } = require('../utils/');
class Sockets {
  constructor() {
    this.options = {
      pingInterval: 30000,
      pingTimeout: 15000,
      cookie: false,
      maxHttpBufferSize: 2048,
      serveClient: true,
      transports: ['polling', 'websocket'],
      allowUpgrades: true,
      perMessageDeflate: false,
    };
  }
  initialize(httpServer) {
    global.io = socketIO(httpServer, this.options);
    root.init();
    log.cyan('Socket.io initialized 🔌');
  }
}

module.exports = new Sockets();
