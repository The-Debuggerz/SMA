const { Schema, model } = require('mongoose');

const User = Schema(
  {
    sEmail: { type: String, default: '' },
    sMobile: { type: String, default: '' },
    sUserName: { type: String, default: '' },
    sFullName: { type: String, default: '' },
    sPassword: { type: String },
    sGoogleId: String,
    sAvatar: String,
    sPushToken: String,
    dDob: Date,
    sToken: String,
    sVerificationToken: String,
    sRootSocket: String,
    nOTP: Number,
    isEmailVerified: { type: Boolean, default: false },
    isMobileVerified: { type: Boolean, default: false },
    eGender: {
      type: String,
      enum: ['male', 'female', 'unspecified'],
      default: 'unspecified',
    },
    eUserType: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    eStatus: {
      type: String,
      enum: ['y', 'n', 'd'],
      default: 'y',
    },
  },
  { timestamps: { createdAt: 'dCreatedDate', updatedAt: 'dUpdatedDate' } }
);

module.exports = model('users', User);
