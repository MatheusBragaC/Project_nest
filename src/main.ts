import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as figlet from 'figlet';

let cachedServer;

async function bootstrap() {
  const appName = 'ProjectPix';
  try {
    console.log(figlet.textSync(appName, { horizontalLayout: 'default' }));
  } catch (e) {
    console.log('ProjectPix');
    console.error('Erro ao gerar ASCII Art com figlet:', e);
  }
  console.log();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'https://project-front-tau.vercel.app',
    credentials: true,
  });
  return app;
}

async function bootstrapServer() {
  if (!cachedServer) {
    const app = await bootstrap();
    await app.init();
    cachedServer = app.getHttpAdapter().getInstance();
  }
  return cachedServer;
}

export default async function handler(req, res) {
  const server = await bootstrapServer();
  server(req, res);
}

// Local: só inicia servidor se não for produção
if (process.env.NODE_ENV !== 'production') {
  bootstrap().then((app) =>
    app.listen(process.env.PORT || 3000, () =>
      console.log(`🚀 http://localhost:${process.env.PORT || 3000}`),
    ),
  );
}
