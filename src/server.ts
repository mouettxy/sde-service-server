import configDatabase from './config/database';
import * as fastify from 'fastify';
import mongoose from 'mongoose';
import { Server, IncomingMessage, ServerResponse } from 'http';

const server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify.fastify({ logger: true });

const mongooseOpts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(configDatabase.url, mongooseOpts)
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

export default server;
