const fs = require('fs');
const https = require('https');

const app = require('./app');

const PORT = process.env.PORT || 5000;

https
  .createServer(
    {
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem'),
    },
    app
  )
  .listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
