const { Schema, model } = require('mongoose');

const FollowingUsers = Schema(
  {
    iUserId: { type: Schema.Types.ObjectId, ref: 'users' },
    iFollowingUserId: { type: Schema.Types.ObjectId, ref: 'users' },
    bStatus: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: 'dCreatedDate', updatedAt: 'dUpdatedDate' } }
);

module.exports = model('following-users', FollowingUsers);
