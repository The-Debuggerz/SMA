const UserSocket = require('./userSocket');
const { User } = require('../../models');
const { log, _, messages } = require('../../utils/');

class RootSocket {
  init() {
    this.setEventListeners();
  }
  setEventListeners() {
    global.io.use((socket, next) => this.middleware(socket, next));
    global.io.on('connection', socket => new UserSocket(socket));
    global.io.on('error', error => log.red(`${_.now()} error in socket initialization ${error.message}}`));
  }
  async middleware(socket, next) {
    try {
      const { authorization } = socket.handshake.headers || socket.handshake.auth;
      if (!authorization) return next(new Error(messages.unauthorized().message));

      const decodedToken = _.decodeToken(authorization);
      if (!decodedToken) return next(new Error(messages.unauthorized().message));

      const query = { _id: decodedToken._id };
      const project = {
        eStatus: true,
        isMobileVerified: true,
        sRootSocket: true,
        sToken: true,
        sMobile: true,
      };

      const user = await User.findOne(query, project).lean();
      if (!user) return next(new Error(messages.unauthorized().message));
      if (user.sToken !== authorization) return next(new Error(messages.unauthorized().message));
      socket.user = { iUserId: user._id.toString(), sUserName: user.sUserName };
      await User.updateOne(query, { $set: { sRootSocket: socket.id, bIsOnline: true } });
      next();
      return true;
    } catch (error) {
      log.red(`${_.now()} Error at socket connection! Reason: ${error.message}`);
    }
  }
}

module.exports = new RootSocket();
