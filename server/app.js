require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');

const Post = require('./models/PostSchema');

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (error) => {
  console.error(error);
});

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 10, // Limit each IP to 10 requests per `window` (here, per 1 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: JSON.stringify('Too many request from this IP'),
});

const app = express();

app.use(cors());
// Helmet helps you secure your Express apps by setting various HTTP headers
app.use(helmet());
// Apply the rate limiting middleware to all requests
app.use('/posts', limiter);

// TODO: request count
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/create', (req, res) => {
  console.log('Connected to React');
});

app.get('/posts', (req, res) => {
  Post.find({}).then((data) => {
    console.log(`Sending ${data.length} Post Packets!`);
    res.json(data);
  });
});

module.exports = app;
