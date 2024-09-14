import { Express, Request, Response } from 'express';

const Routes = {
  setup(app: Express) {
    app.get('/', (req: Request, res: Response) => {
      res.send('<h1>Hello World! :)</h1>');
    });
  },
};

export default Routes;
