const http = require('http');

const app = require('./app');
const sockets = require('./sockets');
const { log } = require('./utils');
const { connectDB, redis } = require('../server/utils/');
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

(async () => {
  await connectDB();
  server.listen(PORT, () => {
    log.blue(`Listening on port ${PORT}...`);
  });
<<<<<<< HEAD
  // sockets.initialize(server);
=======
  await redis.initialize();
  sockets.initialize(server);
>>>>>>> f86cfc3d01e20511747bb1112503b958fd7c7834
})();
