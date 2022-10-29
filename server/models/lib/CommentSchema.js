const { Schema, model } = require('mongoose');

const Comments = Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    postId: { type: Schema.Types.ObjectId, ref: 'post' },
    comment: String,
  },
  { timestamps: { createdAt: 'dCreatedDate', updatedAt: 'dUpdatedDate' } }
);

module.exports = model('comment', Comments);
