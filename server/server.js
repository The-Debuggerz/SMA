require('dotenv').config();
const http = require('http');
const cloudinary = require('cloudinary');

const app = require('./app');
const { log, connectDB } = require('./utils');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

(async () => {
  try {
    await connectDB();
    await cloudinary.v2.api.ping();
    log.blue('Cloudinary connection successful');
  } catch (error) {
    log.red('Cloudinary connection failed:', error);
  }
  server.listen(PORT, () => {
    log.blue(`Listening on port ${PORT}...`);
  });
})();
