const { Schema, model } = require('mongoose');

const FollowingUsers = Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    followingUserId: { type: Schema.Types.ObjectId, ref: 'user' },
    status: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: 'dCreatedDate', updatedAt: 'dUpdatedDate' } }
);

module.exports = model('following-user', FollowingUsers);
