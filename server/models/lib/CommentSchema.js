const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;

const CommentSchema = Schema(
  {
    text: {
      type: String,
    },
    gifUrl: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
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

module.exports = model('Comment', CommentSchema);
