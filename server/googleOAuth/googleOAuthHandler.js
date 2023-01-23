const jwt = require('jsonwebtoken');
const { getGoogleUser } = require('./googleOAuth');
const { User } = require('../models/index');

const { getGoogleOAuthToken } = require('./googleOAuth');

exports.googleOAuthHandler = async (req, res) => {
  try {
    // get the code from qs
    const code = req.query.code;

    //get the id and access token with the code
    const { id_token, access_token } = await getGoogleOAuthToken({ code });

    const googleUser = await getGoogleUser({ id_token, access_token });
    // console.log('googleUser', googleUser);

    const existingUser = await User.findOne({ email: googleUser.email });

    // if no user then save user to db and login
    if (!existingUser) {
      if (!googleUser.verified_email) {
        return res.status(403).send('Google account is not verified');
      }

      // Set username to google signup user
      let userEmail = await googleUser.email;
      let findAt = userEmail.indexOf('@');
      let setUsername = userEmail.slice(0, findAt);

      let usernameExists = User.findOne({ username: setUsername });

      if (usernameExists) {
        setUsername += Math.floor(Math.random() * 100);
      }

      const picture = googleUser.picture.replace('=s96-c', '=s512-c');

      //create new user
      const user = new User({
        name: googleUser.name,
        username: setUsername,
        email: googleUser.email,
        picture: picture,
        password: 'google-oauth',
      });

      await user.save();

      const accessToken = jwt.sign({ _id: user._id, username: user.username }, process.env.PRIVATE_KEY, {
        expiresIn: '12h',
      });

      if (process.env.NODE_ENV === 'production') {
        // set cookies
        res.cookie('jwtoken', accessToken, {
          maxAge: 43200000, // 12 hr
          httpOnly: true,
          domain: process.env.DOMAIN,
          path: '/',
          sameSite: 'lax',
          secure: true,
        });

        res.redirect(process.env.ORIGIN);
      } else {
        res.redirect(`${process.env.ORIGIN}/oauth?token=${accessToken}`);
      }
    }

    const accessToken = jwt.sign({ _id: existingUser._id, username: existingUser.username }, process.env.PRIVATE_KEY, {
      expiresIn: '12h',
    });

    if (process.env.NODE_ENV === 'production') {
      // set cookies
      res.cookie('jwtoken', accessToken, {
        maxAge: 43200000, // 12 hr
        httpOnly: true,
        domain: process.env.DOMAIN,
        path: '/',
        sameSite: 'lax',
        secure: true,
      });

      res.redirect(process.env.ORIGIN);
    } else {
      res.redirect(`${process.env.ORIGIN}/oauth?token=${accessToken}`);
    }
  } catch (error) {
    console.log(error, 'failed to authorize google user');
    return res.redirect(`${process.env.ORIGIN}/login`);
  }
};
