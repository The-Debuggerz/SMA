const { Schema, model } = require('mongoose');

const Likes = Schema(
  {
    iUserId: { type: Schema.Types.ObjectId, ref: 'users' },
    iPostId: { type: Schema.Types.ObjectId, ref: 'posts' },
  },
  { timestamps: { createdAt: 'dCreatedDate', updatedAt: 'dUpdatedDate' } }
);

module.exports = model('likes', Likes);
