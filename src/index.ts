import 'reflect-metadata';
import * as Server from './server';
import * as Database from './database';
import { buildSchema } from 'type-graphql';

import { ObjectId } from 'mongodb';
import { ObjectIdScalar } from './helpers/object-id.scalar';
import { TypegooseMiddleware } from './middleware/typegoose-middleware';
import path from 'path';

import { UserResolver } from './shema/resolvers/user.resolver';

import { seedDatabase } from './helpers/seed';

console.log(`Running environment ${process.env.NODE_ENV || 'dev'}`);

process.on('uncaughtException', (error: Error) => {
  console.error(`uncaughtException ${error.message}`);
});

// Catch unhandling rejected promises
process.on('unhandledRejection', (reason: any) => {
  console.error(reason);
  console.error(`unhandledRejection ${reason}`);
});

const start = async () => {
  try {
    const database = await Database.init();
    //await Database.init();
    // TODO: seed database for dev proposes here
    await database.db.dropDatabase();
    await seedDatabase();

    const schema = await buildSchema({
      resolvers: [UserResolver],
      emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
      globalMiddlewares: [TypegooseMiddleware],
      scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
      validate: false,
    });

    const server = await Server.init(schema);
    await server.start();
    console.log('Server running at:', `http://${server.info.address}:${server.info.port}`);
    console.log(
      `List of all routes: ${server
        .table()
        .map((route) => route.path)
        .join(', ')}`
    );
  } catch (err) {
    console.error('Error starting server: ', err.message);
    throw err;
  }
};

start();
