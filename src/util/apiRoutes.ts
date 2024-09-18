import { Express, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
import ITodo from '../models/todo';
import Store from './store';
import Api from './api';

const ApiRoutes = {
  setup(app: Express) {
    app.use(cors({ origin: true, credentials: true }));
    app.get('/api', async (req: Request, res: Response) => {
      res.send('Generic API response');
    });

    app.get('/api/todos/:id', async (req: Request, res: Response) => {
      const store = new Store();
      try {
        const { id } = req.params;

        const todo = await store.getTodo(id);
        res.send(Api.getResponseSuccess({ todo }));
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

    app.get('/api/todos', async (req: Request, res: Response) => {
      const store = new Store();
      try {
        const todos = await store.getTodos();
        res.send(Api.getResponseSuccess({ todos }));
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

    app.post('/api/todos', async (req: Request, res: Response) => {
      const store = new Store();
      if (!req.body.todo) {
        res.send(Api.getResponseFailure('Missing todo'));
      }

      const { todo }: { todo: ITodo } = req.body;

      if (!todo.title) {
        res.send(Api.getResponseFailure('Missing todo title'));
      }

      const datetime = new Date();

      todo.id = uuidv4().replaceAll('-', '');
      todo.created_date = datetime.toISOString();
      todo.updated_date = datetime.toISOString();
      todo.done = false;
      todo.due_date = null;
      todo.done_date = null;

      try {
        const addedTodo = await store.addTodo(todo);
        res.send(Api.getResponseSuccess({ todo: addedTodo }));
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

    app.put('/api/todos', async (req: Request, res: Response) => {
      const store = new Store();
      if (!req.body.todo) {
        res.send(Api.getResponseFailure('Missing todo'));
      }

      const { todo }: { todo: ITodo } = req.body;

      if (!todo.title) {
        res.send(Api.getResponseFailure('Missing todo title'));
      }

      const datetime = new Date();
      todo.updated_date = datetime.toISOString();

      try {
        const updatedTodo = await store.updateTodo(todo);
        res.send(Api.getResponseSuccess({ todo: updatedTodo }));
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

    app.delete('/api/todos/:id', async (req: Request, res: Response) => {
      const store = new Store();
      try {
        const { id } = req.params;

        await store.deleteTodo(id);
        res.send(Api.getResponseSuccess({}));
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
