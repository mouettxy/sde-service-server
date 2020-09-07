export const domain: string = process.env.DATABASE || 'localhost';
export const port: string = process.env.DATABASE_PORT || '27017';
export const doc: string = process.env.DATABASE_DOCUMENT || 'sde-service';
export const user: string = process.env.MONGO_INITDB_ROOT_USERNAME || 'root';
export const password: string = process.env.MONGO_INITDB_ROOT_PASSWORD || 'root';

export const url: string = `mongodb://${domain}:${port}/${doc}`;

import { ConnectionOptions } from 'mongoose';

export const options: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  pass: password,
  user,
};

export default { url, options };
