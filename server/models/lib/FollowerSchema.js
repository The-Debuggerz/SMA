const { Schema, model } = require('mongoose');

const Followers = Schema(
  {
    iUserId: { type: Schema.Types.ObjectId, ref: 'users' },
    iFollowerUserId: { type: Schema.Types.ObjectId, ref: 'users' },
    bStatus: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: 'dCreatedDate', updatedAt: 'dUpdatedDate' } }
);

module.exports = model('followers', Followers);
