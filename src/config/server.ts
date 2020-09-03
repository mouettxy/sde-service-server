const port: number = ((process.env.SERVER_PORT as unknown) as number) || 8000;
const domain: string = process.env.SERVER || 'localhost';

export default {
  port,
  domain,
};
