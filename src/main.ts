import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'https://project-front-tau.vercel.app',
    credentials: true,
  });
  return app;
}

// Local: só inicia servidor se não for produção
if (process.env.NODE_ENV !== 'production') {
  bootstrap().then((app) =>
    app.listen(process.env.PORT || 3000, () =>
      console.log(`🚀 http://localhost:${process.env.PORT || 3000}`),
    ),
  );
}
