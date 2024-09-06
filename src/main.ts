import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors({
    origin: [
      'http://localhost:3001',
      'http://localhost:3000',
      'https://nexo-tv.vercel.app',
      'https://frontnexotv.vercel.app',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH', 'HEAD'],
    credentials: true,
    allowedHeaders: 'Content-Type,Accept,Authorization',
  });

  app.use('/public', express.static(join(__dirname, '..', 'public')));

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
