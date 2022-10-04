/* eslint-disable no-undef */
const helmet = require('helmet');
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const router = require('../server/routers');

class Server {
  constructor() {
    this.options = {
      key: fs.readFileSync(path.join(__dirname, 'certificates', 'key.pem')),
      cert: fs.readFileSync(path.join(__dirname, 'certificates', 'cert.pem')),
    };
  }

  async initialize() {
    this.app = express();
    this.httpServer = http.createServer(this.options, this.app);
    this.setupMiddleware();
    this.setupServer();
    global.app = this.app;
  }

  setupMiddleware() {
    this.app.use(helmet());
    this.app.use(express.json({ limit: '100kb' }));
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      );
      res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With,content-type',
      );
      next();
    });
    this.app.use(this.routeConfig);
    if (process.env.NODE_ENV !== 'prod') {
      this.app.use(
        morgan('dev', {
          skip: (req) =>
            req.path === 'api/v1/health' || req.path === '/favicon.ico',
        }),
      );
    }
    this.app.use('/api/v1', router);
    this.app.use('*', this.routeHandler);
    this.app.use(this.logErrors);
    this.app.use(this.errorHandler);
  }

  setupServer() {
    this.httpServer.timeout = 10000;
    this.httpServer.listen(process.env.PORT, () =>
      log.blue(`Spinning on ${process.env.PORT} 🌀`),
    );
  }

  routeConfig(req, res, next) {
    if (req.path === '/ping') return res.status(200).send('ok');
    res.reply = ({ code, message }, data = {}, header = undefined) => {
      res.status(code).header(header).json({ message, data });
    };
    next();
  }

  routeHandler(req, res) {
    res.status(404);
    res.send({ message: 'Route not found' });
  }

  logErrors(err, req, res, next) {
    log.error(`${req.method} ${req.url}`);
    log.error('body -> ', req.body);
    log.error(err.stack);
    return next(err);
  }

  errorHandler(err, req, res) {
    res.status(500);
    res.send({ message: err });
  }
}

module.exports = new Server();
