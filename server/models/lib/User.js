const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    sUserName: {
      type: String,
      unique: true,
    },
    sEmail: {
      type: String,
      unique: true,
    },
    sPassword: {
      type: String,
    },
    aTokens: [
      {
        sToken: {
          type: String,
          required: true,
        },
      },
    ],
    sTempToken: { type: String },
    sMobile: {
      type: String,
      required: true,
    },
    sGender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const sToken = jwt.sign({ _id: user.id.toString() }, process.env.TOKEN);

  user.aTokens.push({ sToken });
  await user.save();

  return sToken;
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('sPassword')) {
    user.sPassword = await bcrypt.hash(user.sPassword, 8);
  }
  next();
});

module.exports = mongoose.model('users', userSchema);
