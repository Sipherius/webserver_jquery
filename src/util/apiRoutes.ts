import { Express, Request, Response } from 'express';
import cors from 'cors';
import Store from './store';
import Api from './api';

const ApiRoutes = {
  setup(app: Express) {
    app.use(cors({ origin: true, credentials: true }));
    app.get('/api', async (req: Request, res: Response) => {
      res.send('Generic API response');
    });

    app.get('/api/todos', async (req: Request, res: Response) => {
      const store = new Store();
      try {
        const todos = await store.getTodos();
        res.send(Api.getResponseSuccess(todos));
      } catch (err: unknown) {
        // eslint-disable-next-line no-console
        console.error(err);
        if (err && typeof err === 'string') {
          res.send(Api.getResponseFailure(err));
        }
        if (err && err instanceof Error) {
          res.send(Api.getResponseFailure(err.message));
        }
      }
    });
  },
};

export default ApiRoutes;
