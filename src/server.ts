import * as Hapi from 'hapi';
import { ApolloServer } from 'apollo-server-hapi';
import config from './config/server';

export async function init(schema: any): Promise<Hapi.Server> {
  try {
    console.log('Starting Apollo Server ...');
    const server = new ApolloServer({ schema, playground: true });
    console.log('Apollo Server started');

    console.log('Starting Hapi Server ...');
    const app = new Hapi.Server({
      debug: { request: ['error'] },
      port: config.port,
      routes: {
        cors: {
          origin: ['*'],
        },
      },
    });
    console.log('Hapi Server started');

    await server.applyMiddleware({
      app,
    });

    await server.installSubscriptionHandlers(app.listener);

    console.log('All plugins registered successfully.');

    console.log('Register Routes');
    // TODO: Routes
    console.log('Routes registered sucessfully.');

    return app;
  } catch (err) {
    console.log('Error starting server: ', err);
    throw err;
  }
}
