require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const Post = require('./models/');

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 10, // Limit each IP to 10 requests per `window` (here, per 1 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: JSON.stringify('Too many request from this IP'),
});

const app = express();
function routeConfig(req, res, next) {
  if (req.path === '/ping') return res.status(200).send({});
  res.reply = ({ code, message }, data = {}, header = undefined) => {
    res.status(code).header(header).jsonp({ message, data });
  };
  next();
}

function routeHandler(req, res) {
  res.status(404);
  res.send({ message: 'Route not found' });
}

app.use(cors());
// Helmet helps you secure your Express apps by setting various HTTP headers
app.use(helmet());
app.use(routeConfig);
app.use(routeHandler);
// Apply the rate limiting middleware to all requests
// TODO: request count
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.get('/api/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/posts', (req, res) => {
  console.log('here');
  res.send([Math.random()]);
});

app.post('/api/create', (req, res) => {
  console.log('Connected to React');
});

app.get('/api/posts', limiter, (req, res) => {
  Post.find({}).then((data) => {
    console.log(`Sending ${data.length} Post Packets!`);
    res.json(data);
  });
});

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
