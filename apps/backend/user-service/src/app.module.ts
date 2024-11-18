import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { UserController } from "./infrastructure/grpc/user.controller";
import { UserRepository } from "./infrastructure/persistence/repositories/user.repository";
import { PrismaService } from "./infrastructure/persistence/prisma/prisma.service";
import { GetUserHandler } from "./queries/handlers/get-user.handler";
import { CreateUserHandler } from "./commands/handlers/create-user.handler";;
import {
  HealthModule
} from "@quentinpiot/health";

@Module({
  imports: [CqrsModule,HealthModule],
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
export class AppModule {
}