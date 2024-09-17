import express, { Express } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const Routes = {
  setup(app: Express) {
    app.use(express.static('dist/frontend'));
  },
};

export default Routes;
