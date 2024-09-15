import { Express, Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

console.log(process.env);
console.log(process.env.API_DOMAIN);

if (!process.env.API_DOMAIN) {
  throw new Error('API_DOMAIN not set.');
}

axios.defaults.baseURL = process.env.API_DOMAIN;

const Routes = {
  setup(app: Express) {
    app.get('/', (req: Request, res: Response) => {
      res.send('<h1>Hello World!</h1>');
    });

    app.get('/call', (req: Request, res: Response) => {
      axios.get('/api')
        .then((response: AxiosResponse) => {
          // handle success
          // eslint-disable-next-line no-console
          console.log(`Response: ${response.data}`);
          res.send(`<h1>API Response:</h1><pre>${response.data}</pre>`);
        })
        .catch((error: any) => {
          // handle error
          // eslint-disable-next-line no-console
          console.log(error);
          res.send(`<h1>Error: </h1><pre>${JSON.stringify(error)}</pre>`);
        })
        .finally(() => {
          // always executed
        });
    });
  },
};

export default Routes;
