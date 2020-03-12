const { createServer: httpCreateServer } = require('http');
const express = require('express');
const next = require('next');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const isDev = process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging';
const port = process.env.PORT || 3000;

const app = next({
  dev: isDev,
  dir: './app',
});
const handle = app.getRequestHandler();

const createServer = httpCreateServer;

const logFormat = isDev ? 'dev' : 'combined';

app.prepare().then(() => {
  const server = express();
  server.disable('x-powered-by');
  server.set('trust proxy', true);

  // cookieParser is used to read the preferred language cookie in translations middleware.
  server.use(cookieParser());

  server.use(
    morgan(logFormat, {
      skip: (req) => /(on-demand-entries-ping|webpack)/.test(req.path),
    }),
  );

  server.get('/', (req, res) => {
    app.render(req, res, '/interactions-home', { ...req.query, ...req.params });
  });

  server.get('/interactions', (req, res) => {
    app.render(req, res, '/interactions-home', { ...req.query, ...req.params });
  });

  server.get('*', (req, res) => handle(req, res));

  createServer(server).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line no-console
  });
});
