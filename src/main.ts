import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cors = require('cors');



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.enableCors({
    origin: '*', // Allow all origins (use specific origins in production)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
    allowedHeaders: 'Content-Type, Authorization', // Allowed headers
    credentials: true, // Allow cookies
  });
  app.useGlobalPipes(new ValidationPipe())




  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
