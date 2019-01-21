import * as express from 'express';
import path = require('path');

import Routes from './routes/api'

import Persistance from '@tv-mazing/persistence';

class App {

  public app: express.Application;

  constructor() {
    this.app = express();

    const mongo = new Persistance({
      mongoHost: "localhost",
      mongoPort: 27017,
      dbName: "shows"
    });

    const routesProvider = new Routes(mongo);

    routesProvider.routes(this.app);
  }

  private config() {
    var publicPath = path.resolve(__dirname, 'public');
  }

}

export default new App().app;