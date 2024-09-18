import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import http from 'http';

import Routes from './util/routes';
import ApiRoutes from './util/apiRoutes';

dotenv.config();

const port = process.env.PORT || 3000;

const app: Express = express();

app.use(bodyParser.json());

Routes.setup(app);
ApiRoutes.setup(app);

const server = http.createServer(app);

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`HTTP server started on port ${port}`);
});
