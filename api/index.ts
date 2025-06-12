// @ts-ignore
import { createServer, proxy } from 'vercel/node';
import { bootstrap } from '../src/main';

let server: any;

export default async function handler(req: any, res: any) {
  if (!server) {
    const app = await bootstrap();
    server = createServer(app.getHttpAdapter().getInstance());
  }
  return proxy(req, res, server);
}
