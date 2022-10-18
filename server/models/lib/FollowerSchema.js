const { Schema, model } = require('mongoose');

const Followers = Schema(
  {
    iUserId: { type: Schema.Types.ObjectId, ref: 'users' },
    iFollowerUserId: { type: Schema.Types.ObjectId, ref: 'users' },
  },
  { timestamps: { createdAt: 'dCreatedDate', updatedAt: 'dUpdatedDate' } }
);

module.exports = model('followers', Followers);
