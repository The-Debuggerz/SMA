// const fs = require('fs');
// const path = require('path');
const http = require('http');

const app = require('./app');
const sockets = require('./sockets');
const { log } = require('./utils');
const { connectDB } = require('../server/utils/');

const PORT = process.env.PORT || 5000;

const server = http.createServer(
  // {
  //   key: fs.readFileSync(path.join(__dirname, 'certificates', 'key.pem')),
  //   cert: fs.readFileSync(path.join(__dirname, 'certificates', 'cert.pem')),
  // },
  app
);

(async () => {
  await connectDB();
  server.listen(PORT, () => {
    log.blue(`Listening on port ${PORT}...`);
  });
  sockets.initialize(server);
})();
