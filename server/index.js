require('./env');
require('./globals');

const server = require('./app');
const { mongoose } = require('./util/');

mongoose.initialize();
server.initialize();
