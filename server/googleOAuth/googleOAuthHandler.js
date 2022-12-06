const jwt = require('jsonwebtoken');
const { getGoogleUser } = require('./googleOAuth');
const { User } = require('../models/index');

const { getGoogleOAuthToken, findAndUpdateUser } = require('./googleOAuth');

exports.googleOAuthHandler = async (req, res) => {
  try {
    // get the code from qs
    const code = req.query.code;

    //get the id and access token with the code
    const { id_token, access_token } = await getGoogleOAuthToken({ code });
    // console.log('🚀 ~ sessions.js ~ line 14~ id_token, access_token', { id_token, access_token });

    const googleUser = await getGoogleUser({ id_token, access_token });
    console.log('googleUser', googleUser);

    if (!googleUser.verified_email) {
      return res.status(403).send('Google account is not verified');
    }

    // Set username to google signup user
    let userEmail = await googleUser.email;
    let findAt = userEmail.indexOf('@');
    let setUsername = userEmail.slice(0, findAt);

    let usernameExists = User.findOne({ username: setUsername });
    // console.log('🚀 ~ sessions.js ~ line 29 ~ usernameExists', usernameExists);

    if (usernameExists) {
      setUsername += Math.floor(Math.random() * 100);
    }

    // upsert user
    const user = await findAndUpdateUser(
      {
        email: googleUser.email,
      },
      {
        name: googleUser.name,
        username: setUsername,
        email: googleUser.email,
        picture: googleUser.picture,
      },
      {
        upsert: true,
        new: true,
      }
    );
    // console.log('🚀 ~ sessions.js ~ line 51 ~ user', user);

    const accessToken = jwt.sign({ _id: user._id }, process.env.PRIVATE_KEY, {
      expiresIn: '1h',
    });

    // console.log('🚀 ~ sessions.js ~ line 57 accessToken', accessToken);
    // console.log('🚀 ~ sessions.js ~ line 58 user._id', user._id);

    jwt.verify(accessToken, process.env.PRIVATE_KEY, function (err, decoded) {
      if (err) {
        console.log('JWT Token Expired');
        console.log('auth-decoded', decoded);
        return res.status(401).json({ name: 'TokenExpiredError', message: 'jwt expired' });
      }
      // console.log('🚀 ~ sessions.js ~ line 66 ~ decoded', decoded);

      // set cookies
      res.cookie('jwtoken', accessToken, {
        maxAge: 3600000, // 1 hr
        httpOnly: true,
        domain: process.env.DOMAIN,
        path: '/',
        sameSite: 'lax',
        secure: false,
      });

      req.token = accessToken;
      req.user = decoded;

      res.redirect(process.env.ORIGIN);
    });
  } catch (error) {
    console.log(error, 'failed to authorize google user');
    return res.redirect('/api/failed');
  }
};
