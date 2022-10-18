// const fs = require('fs');
// const path = require('path');
// const http = require('http');

const app = require('./app');
const { log } = require('./utils');

const PORT = process.env.PORT || 5000;

// http
//   .createServer(
//     // {
//     //   key: fs.readFileSync(path.join(__dirname, 'certificates', 'key.pem')),
//     //   cert: fs.readFileSync(path.join(__dirname, 'certificates', 'cert.pem')),
//     // },
//     app
//   )
//   .listen(PORT, () => {
//     console.log(`Listening on port ${PORT}...`);
//   });

app.listen(PORT, () => {
  log.blue(`Listening on port ${PORT}...`);
});
