import { HealthModule } from "@quentinpiot/health";

import { CreateUserHandler } from "./commands/handlers/create-user.handler";
import { UserController } from "./infrastructure/grpc/user.controller";
import { PrismaService } from "./infrastructure/persistence/prisma/prisma.service";
import { UserRepository } from "./infrastructure/persistence/repositories/user.repository";
import { GetUserHandler } from "./queries/handlers/get-user.handler";

import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

@Module({
  imports: [CqrsModule, HealthModule],
  controllers: [UserController],
  providers: [
    PrismaService,
    {
      provide: "IUserRepository",
      useClass: UserRepository,
    },
    UserRepository,
    CreateUserHandler,
    GetUserHandler,
  ],
})
export class AppModule {}
