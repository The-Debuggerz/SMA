const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      text: true,
      index: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      default: null,
    },
    imagePublicId: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    followers: [{ type: ObjectId, ref: 'User' }],
    following: [{ type: ObjectId, ref: 'User' }],

    resetToken: String,
    resetTokenExpiration: Date,
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ name: 'text', username: 1 });

module.exports = model('User', UserSchema);
