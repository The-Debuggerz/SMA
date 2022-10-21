const { redis, mongodb, _, log } = require('../utils');
const { Types } = require('mongoose');

class RoomManager {
  async createRoom() {
    log.blue(`Room creation started... `);
    const roomData = {
      iRoomId: Types.ObjectId(),
      aUserId: [],
      aUsers: [],
      bFreezed: false,
    };
    const sRedisSetResponse = await redis.client.json.SET(_.getRoomKey(roomData.iBattleId), '.', roomData);
    if (!sRedisSetResponse) return null;

    return new Room(roomData);
  }
  // async getRoom() {}
}
