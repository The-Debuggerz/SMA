const axios = require('axios');
const qs = require('qs');

exports.getGoogleOAuthToken = async ({ code }) => {
  const url = 'https://oauth2.googleapis.com/token';

  const values = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL,
    grant_type: 'authorization_code',
  };

  try {
    const res = await axios.post(url, qs.stringify(values), {
      Headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return res.data;
  } catch (error) {
    console.error(error);
    console.log(error.response.data.error, 'failed to fetch google oauth');

    throw new Error(error.message);
  }
};

exports.getGoogleUser = async ({ id_token, access_token }) => {
  try {
    const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
      Headers: {
        Authorization: `Bearer ${id_token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error, 'Error fetching google user');
    throw new Error(error.message);
  }
};
