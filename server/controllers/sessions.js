const jwt = require('jsonwebtoken');
const { getGoogleUser } = require('../service/googleOAuth');

const { getGoogleOAuthToken, findAndUpdateUser } = require('../service/googleOAuth');

exports.googleOAuthHandler = async (req, res) => {
  try {
    // get the code from qs
    const code = req.query.code;

    //get the id and access token with the code
    const { id_token, access_token } = await getGoogleOAuthToken({ code });
    console.log({ id_token, access_token });

    const googleUser = await getGoogleUser({ id_token, access_token });
    console.log('googleUser', googleUser);

    if (!googleUser.verified_email) {
      return res.status(403).send('Google account is not verified');
    }

    // upsert user
    const user = await findAndUpdateUser(
      {
        email: googleUser.email,
      },
      {
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture,
      },
      {
        upsert: true,
        new: true,
      }
    );
    console.log('🚀 ~ sessions.js ~ line 50 ~ user', user);

    const accessToken = jwt.sign({ _id: user._id }, process.env.PRIVATE_KEY, {
      expiresIn: '1h',
    });

    console.log('🚀 ~ sessions.js ~ line 44 accessToken', accessToken);
    console.log('🚀 ~ sessions.js ~ line 45 user._id', user._id);

    jwt.verify(accessToken, process.env.PRIVATE_KEY, function (err, decoded) {
      if (err) {
        console.log('JWT Token Expired');
        console.log('auth-decoded', decoded);
        return res.status(401).json({ name: 'TokenExpiredError', message: 'jwt expired' });
      }

      console.log('🚀 ~ file: sessions.js ~ line 47 ~ decoded', decoded);

      // set cookies
      res.cookie('jwtoken', accessToken, {
        maxAge: 3600000, // 1 hr
        httpOnly: true,
        domain: 'localhost',
        path: '/',
        sameSite: 'lax',
        secure: false,
      });

      req.token = accessToken;
      req.user = decoded;

      console.log('*****************************************');
      res.redirect(process.env.ORIGIN);
    });
  } catch (error) {
    console.log(error, 'failed to authorize google user');
    return res.redirect('/api/failed');
  }
};
