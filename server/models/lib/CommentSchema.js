const { Schema, model } = require('mongoose');

const Comments = Schema(
  {
    iUserId: { type: Schema.Types.ObjectId, ref: 'users' },
    iPostId: { type: Schema.Types.ObjectId, ref: 'posts' },
    sComment: String,
  },
  { timestamps: { createdAt: 'dCreatedDate', updatedAt: 'dUpdatedDate' } }
);

module.exports = model('comments', Comments);
