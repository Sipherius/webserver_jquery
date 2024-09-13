import dotenv from 'dotenv';
import express, { Express } from 'express';
import http from 'http';

import Routes from './util/routes';

dotenv.config();

const port = process.env.PORT || 3000;

const app: Express = express();

Routes.setup(app);

const server = http.createServer(app);

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`HTTP server started on port ${port}`);
});
