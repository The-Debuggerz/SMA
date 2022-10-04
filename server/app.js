const path = require('path');
const express = require('express');
const helmet = require('helmet');

const app = express();

// Helmet helps you secure your Express apps by setting various HTTP headers
app.use(helmet());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/post', (req, res) => {
  console.log('Connected to React');
  res.redirect('/');
});

module.exports = app;
