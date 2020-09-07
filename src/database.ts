import Mongoose from 'mongoose';
import config from './config/database';

export async function init() {
  console.log('Starting mongoose connection on ' + config.url);
  (<any>Mongoose).Promise = Promise;
  await Mongoose.connect(config.url, config.options);

  Mongoose.connection.on('error', () => {
    console.log(`Unable to connect to database: ${config.url}`);
  });

  Mongoose.connection.once('open', () => {
    console.log(`Connected to database: ${config.url}`);
  });

  return Mongoose.connection;
}
