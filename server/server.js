const http = require('http');

const app = require('./app');
const { log } = require('./utils');
const { connectDB } = require('../server/utils/');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

(async () => {
  await connectDB();
  server.listen(PORT, () => {
    log.blue(`Listening on port ${PORT}...`);
  });
})();
