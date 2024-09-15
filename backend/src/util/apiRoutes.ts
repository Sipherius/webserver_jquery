import { Express, Request, Response } from 'express';

const ApiRoutes = {
  setup(app: Express) {
    app.get('/api', (req: Request, res: Response) => {
      res.send('This is the API Response text.');
    });
  },
};

export default ApiRoutes;
