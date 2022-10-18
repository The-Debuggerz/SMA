const { Schema, model } = require('mongoose');

const Post = new Schema(
  {
    iUserId: { type: Schema.Types.ObjectId, ref: 'users' },
    sTitle: String,
    sContent: String,
    sImage: String,
  },
  { timestamps: { createdAt: 'dCreatedDate', updatedAt: 'dUpdatedDate' } }
);

module.exports = model('posts', Post);
