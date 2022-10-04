const fs = require('fs');
const path = require('path');
const https = require('https');

const app = require('./app');

const PORT = process.env.PORT || 5000;

https
  .createServer(
    {
      key: fs.readFileSync(path.join(__dirname, 'certificates', 'key.pem')),
      cert: fs.readFileSync(path.join(__dirname, 'certificates', 'cert.pem')),
    },
    app
  )
  .listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
