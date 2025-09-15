// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Bật CORS để Next.js gọi API
  app.enableCors({
    origin: 'http://localhost:3000', // domain của Next.js
    credentials: true,               // cho phép gửi cookie, header Authorization
  });

  // Pipe validate DTO tự động
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // chỉ nhận field có trong DTO
      forbidNonWhitelisted: true, // chặn field lạ
      transform: true, // tự convert kiểu dữ liệu
    }),
  );

  // Nếu muốn prefix API (ví dụ http://localhost:5000/api/auth/...)
  app.setGlobalPrefix('api');

  await app.listen(5000);
  console.log(`🚀 Server running on http://localhost:5000/api`);
}

bootstrap();
