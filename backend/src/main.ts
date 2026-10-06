import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, { cors: true });
    
    app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });

    const port = process.env.PORT || 4000;
    await app.listen(port);
    console.log(`=======================================================`);
    console.log(`🏛  CHỦ TỊCH NƯỚC - VẬN MỆNH QUỐC GIA - NESTJS BACKEND  🏛`);
    console.log(`🚀 Server running on: http://localhost:${port}`);
    console.log(`📊 WebSocket Gateway active at: ws://localhost:${port}`);
    console.log(`👨‍💼 Admin APIs: http://localhost:${port}/api/admin/players`);
    console.log(`=======================================================`);
  } catch (err) {
    console.error('NestJS bootstrap error:', err);
  }
}
bootstrap();
