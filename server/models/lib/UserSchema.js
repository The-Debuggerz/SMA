const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');

const User = Schema(
  {
    name: {
      type: String,
      required: true,
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
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    resetToken: String,
    resetTokenExpiration: Date,
  },
  {
    timestamps: true,
  }
);

// User.methods.generateAuthToken = async function () {
//   try {
//     let userToken = jwt.sign(
//       { _id: this._id.toString() },
//       process.env.PRIVATE_KEY,
//       {
//         expiresIn: '1h',
//       }
//     );
//     this.tokens = this.tokens.concat({ token: userToken });
//     await this.save();
//     return userToken;
//   } catch (error) {
//     console.log(error);
//   }
// };

module.exports = model('user', User);
