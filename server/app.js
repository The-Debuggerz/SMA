require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const { User } = require('./models/index');
const authRoutes = require('./routes/authRoutes');

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 10, // Limit each IP to 10 requests per `window` (here, per 1 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: JSON.stringify('Too many request from this IP'),
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

app.use(cors());

app.use(helmet({ crossOriginEmbedderPolicy: false, originAgentCluster: true }));
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      'img-src': ["'self'", 'https: data: blob:'],
    },
  })
);

app.use('/api', authRoutes);
// TODO: request count
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// app.use((req, res, next) => {
//   if (!req.cookies.jwtoken) {
//     console.log('no token-app.js');
//     return next();
//   }
//   const token = req.cookies.jwtoken;
//   let verifyToken = jwt.verify(token, process.env.PRIVATE_KEY);
//   console.log('verifyToken-app.js:', verifyToken);

//   User.findById({
//     _id: verifyToken._id,
//   })
//     .then(user => {
//       if (!user) {
//         return next();
//       }
//       req.user = user;
//       console.log('req.user-app.js', req.user);
//       next();
//     })

//     .catch(err => {
//       next(new Error(err));
//     });
// });

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  const path = require('path');

  app.use(express.static(path.resolve(__dirname, '..', 'client', 'dist')));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'));
  });
}

module.exports = app;
