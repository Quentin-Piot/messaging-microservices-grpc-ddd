
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { join } from 'path';
import { ReflectionService } from '@grpc/reflection';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.GRPC,
        options: {
            url: "localhost:5000",
            package: 'user',
            protoPath: join(__dirname, '..', 'node_modules', '@quentinpiot','protos', 'user.proto'),
          onLoadPackageDefinition: (pkg, server) => {
            new ReflectionService(pkg).addToServer(server);
          },
        },
    });

    await app.listen();
}
bootstrap();
