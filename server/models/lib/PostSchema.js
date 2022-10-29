const { Schema, model } = require('mongoose');

const Post = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    title: String,
    content: String,
    image: String,
  },
  { timestamps: { createdAt: 'dCreatedDate', updatedAt: 'dUpdatedDate' } }
);

module.exports = model('post', Post);
