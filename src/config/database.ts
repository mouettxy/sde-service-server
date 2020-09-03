export const domain: string = process.env.DATABASE || 'localhost';
export const port: string = process.env.DATABASE_PORT || '27017';
export const doc: string = process.env.DATABASE_DOCUMENT || 'mycargarage';

export const url: string = `mongodb://${domain}:${port}/${doc}`;

export default { url };
