import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'https://project-front-tau.vercel.app',
    credentials: true,
  });
  await app.listen(process.env.PORT);
  console.log(`🚀 Application is running on: ${await app.getUrl()}`);
}

bootstrap();
