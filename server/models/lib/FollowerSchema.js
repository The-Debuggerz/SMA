const { Schema, model } = require('mongoose');

const Followers = Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    followerUserId: { type: Schema.Types.ObjectId, ref: 'user' },
    status: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: 'dCreatedDate', updatedAt: 'dUpdatedDate' } }
);

module.exports = model('follower', Followers);
