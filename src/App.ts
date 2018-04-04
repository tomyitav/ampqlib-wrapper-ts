import * as express from 'express'
import * as _ from 'lodash';

class App {
  public express

  constructor () {
    this.express = express()
    this.tryLodash();
    this.mountRoutes()
  }

  private mountRoutes (): void {
    const router: express.Router = express.Router()
    router.get('/', (req, res) => {
      res.json({
        message: 'Hello World!'
      })
    })
    this.express.use('/', router)
  }

  private tryLodash(): void {
    const arr1 = [1,2,3];
    const arr2 = [4,5,6];

    const result = _.union(arr1, arr2);
    console.log(result);
  }
}

export default new App().express
