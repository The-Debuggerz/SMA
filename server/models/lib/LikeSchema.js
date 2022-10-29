const { Schema, model } = require('mongoose');

const Likes = Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    postId: { type: Schema.Types.ObjectId, ref: 'post' },
  },
  { timestamps: { createdAt: 'dCreatedDate', updatedAt: 'dUpdatedDate' } }
);

module.exports = model('likes', Likes);
