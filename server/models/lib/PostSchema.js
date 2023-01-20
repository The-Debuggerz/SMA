const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;

const PostSchema = new Schema(
  {
    text: {
      type: String,
    },
    image: {
      type: String,
    },
    imagePublicId: {
      type: String,
    },
    user: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    comments: [
      {
        type: ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model('Post', PostSchema);
