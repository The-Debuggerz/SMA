const console = require('console');

function prepare(color, ...logs) {
  const aLogs = [];
  for (let iter = 0; iter < logs.length; iter += 1) {
    aLogs.push(`\x1b${color}`);
    aLogs.push(
      typeof logs[iter] === 'object'
        ? JSON.stringify(logs[iter], null, 2)
        : logs[iter],
    );
  }
  aLogs.push('\x1b[0m');
  console.log(...aLogs);
}

const log = {
  black: () => {},
  red: () => {},
  green: () => {},
  yellow: () => {},
  blue: () => {},
  magenta: () => {},
  cyan: () => {},
  white: () => {},
  console: () => {},
  error: () => {},
  warn: () => {},
  table: () => {},
  info: () => {},
  trace: () => {},
};

if (process.env.NODE_ENV !== 'prod') log.debug = log;

log.black = (...logs) => prepare('[30m', ...logs);
log.red = (...logs) => prepare('[31m', ...logs);
log.green = (...logs) => prepare('[32m', ...logs);
log.yellow = (...logs) => prepare('[33m', ...logs);
log.blue = (...logs) => prepare('[34m', ...logs);
log.magenta = (...logs) => prepare('[35m', ...logs);
log.cyan = (...logs) => prepare('[36m', ...logs);
log.white = (...logs) => prepare('[37m', ...logs);
log.console = console.log;
log.error = console.error;
log.warn = console.warn;
log.table = console.table;
log.info = console.info;
log.trace = console.trace;

module.exports = log;
