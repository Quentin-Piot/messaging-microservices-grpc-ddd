import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log("user-service:5000")
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000); // API Gateway listens on port 3000
}
bootstrap();
