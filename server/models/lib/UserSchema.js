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
<<<<<<< HEAD
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
=======
    bIsOnline: {
      type: Boolean,
      default: false,
    },
>>>>>>> f86cfc3d01e20511747bb1112503b958fd7c7834
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
