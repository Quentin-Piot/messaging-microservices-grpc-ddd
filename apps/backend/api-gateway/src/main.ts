import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import { GrpcToHttpInterceptor } from "nestjs-grpc-exceptions";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes();
  app.useGlobalInterceptors(new GrpcToHttpInterceptor());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
