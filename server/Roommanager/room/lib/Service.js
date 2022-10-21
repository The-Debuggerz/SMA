const { redis, _ } = require('../../../utils');

class Service {
  constructor(oRoomData) {
    this.iRoomId = oRoomData.iRoomId;
    this.aUserId = oRoomData.aUserId;
    this.aUsers = oRoomData.aUsers ? oRoomData.aUsers.map(u => new Users(this, u)) : [];
    this.bFreezed = oRoomData.bFreezed;
  }

  emit(sEventName, response) {
    this.aUsers.forEach(u => u.emit(sEventName, response));
  }
  toJSON() {
    const room = _.pick(this, ['iRoomId', 'aUserId']);
    room.aUsers = this.aUsers.map(u => u.toJSON());
    return room;
  }
}

module.exports = Service;
