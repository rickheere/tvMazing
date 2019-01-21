import { PersistanceConfig, PersistenceLayer } from '@tv-mazing/types'
import { Show } from './schema'
import { ShowModel } from './schema'
import { Show as ShowInterface } from '@tv-mazing/types'
import * as mongoose from 'mongoose';
const logger = require("pino")();


export default class Persistance implements PersistenceLayer {

  constructor({ mongoHost, mongoPort, dbName }: PersistanceConfig) {
    mongoose.connect(`mongodb://${mongoHost}:${mongoPort}/${dbName}`, { useNewUrlParser: true });
  }

  clear(): void {
    logger.info('clear database');
    Show.deleteMany({}).then(() => logger.info('database cleared'));
  }

  saveShow(show: ShowInterface): void {
    const showModel = new Show(show)
    showModel.save().then(() => logger.info(`${show.name} saved`))
  }

  async getShows(page: number): Promise<any> {
    return Show.find({}, null, { skip: 50 * page, limit: 50 })
  }
}
