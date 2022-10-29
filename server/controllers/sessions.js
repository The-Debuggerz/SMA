const { CookieOptions } = require('express');
const jwt = require('jsonwebtoken');
const { signJwt } = require('../utils/lib/jwt');
const { getGoogleUser } = require('../service/user.service');

const {
  getGoogleOAuthToken,
  findAndUpdateUser,
} = require('../service/user.service');

const accessTokenCookieOptions = {
  maxAge: 900000, // 15 mins
  httpOnly: true,
  domain: 'localhost',
  path: '/',
  sameSite: 'lax',
  secure: false,
};

const refreshTokenCookieOptions = {
  ...accessTokenCookieOptions,
  maxAge: 3.154e10, // 1 year
};

async function createSession(userId, userAgent) {
  const session = await SessionModel.create({ user: userId, userAgent });

  return session.toJSON();
}

exports.googleOAuthHandler = async (req, res) => {
  try {
    // get the code from qs
    const code = req.query.code;
    console.log('code', code);

    //get the id and access token with the code
    const { id_token, access_token } = await getGoogleOAuthToken({ code });
    console.log({ id_token, access_token });

    const googleUser = await getGoogleUser({ id_token, access_token });
    // jwt.decode(id_token);
    console.log(googleUser);

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

    // create a session
    const session = await createSession(user._id, req.get('user-agent') || '');

    // create an access token
    const accessToken = signJwt(
      { ...user.toJSON(), session: session._id },
      { expiresIn: 150000 } // 15 minutes
    );

    // create a refresh token
    const refreshToken = signJwt(
      { ...user.toJSON(), session: session._id },
      { expiresIn: 3650000 } // 1 year
    );

    // set cookies
    res.cookie('accessToken', accessToken, accessTokenCookieOptions);

    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);

    res.redirect('/api/posts');
  } catch (error) {
    console.log(error, 'failed to authorize google user');
    return res.redirect('/api');
  }
};
