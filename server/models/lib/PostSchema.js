const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;

const PostSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Post', PostSchema);
