const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;

const LikeSchema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    post: {
      type: ObjectId,
      ref: 'Post',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Like', LikeSchema);
