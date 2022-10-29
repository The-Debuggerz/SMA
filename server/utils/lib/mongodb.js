const { connect } = require('mongoose');
const log = require('./log');

const connectDB = async () => {
  try {
    connect(process.env.DB);
    log.blue('connected to db...');
  } catch (error) {
    console.log(error.message);

    // exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
