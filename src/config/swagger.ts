import server from './server';

export default {
  routePrefix: '/docs',
  exposeRoute: true,
  swagger: {
    info: {
      title: 'sde API',
      description: 'API that provides functional to acces database',
      version: '1.0.0',
    },
    host: `${server.domain}${server.port ? `:${server.port}` : ''}`,
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
  options: {},
};
