const UserSocket = require('./userSocket');
const { User } = require('../../models');
const { log, _ } = require('../../utils/');

class RootSocket {
  constructor() {}
  init() {
    this.setEventListeners();
  }
  setEventListeners() {
    global.io.use((socket, next) => this.middleware(socket, next));
    global.io.on('connection', (socket) => new UserSocket(socket));
    global.io.on('error', (error) => log.console('error in socket :: ', error));
  }
  middleware(socket, next) {
    const { authorization } = socket.handshake.query;
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
    User.findOne(query, project, (error, user) => {
      if (error)
        return next(new Error(messages.server_error(), error.toString()));
      if (!user) return next(new Error(messages.unauthorized().message));

      if (user.eStatus === 'n')
        return next(new Error(messages.blocked('Account').message));
      if (user.eStatus === 'd')
        return next(new Error(messages.deleted('Account').message));
      if (user.sToken !== authorization)
        return next(new Error(messages.unauthorized().message));
      socket.user = { iUserId: user._id.toString() };
      User.updateOne(
        query,
        { $set: { sRootSocket: socket.id } },
        _.errorCallback
      );
      next();
      return true;
    }).lean();
  }
}

module.exports = new RootSocket();
