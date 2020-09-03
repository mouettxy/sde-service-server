import configServer from './config/server';
/* import routes from './routes'; */
import swagger from './config/swagger';

import gql from 'fastify-gql';
import schema from './schema';

import fastify from './server';
import fastifySwagger from 'fastify-swagger';

fastify.register(gql, {
  schema,
  graphiql: true,
});

fastify.register(fastifySwagger, swagger.options);
/*
routes.forEach((route) => {
  fastify.route(route);
}); */

const start = async () => {
  try {
    await fastify.listen(configServer.port, '0.0.0.0');
    fastify.swagger();
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
