import { Module } from '@nestjs/common';
import { CqrsModule } from "@nestjs/cqrs";
import { PrismaModule } from "./prisma/prisma.module";
import { CreateUserHandler } from "./commands/create-user.command";
import { UserRepository } from "./infrastructure/user.repository";
import { UserController } from "./infrastructure/user.controller";

@Module({
  imports: [
    CqrsModule,
    PrismaModule,
  ],
  controllers: [UserController],
  providers: [
    CreateUserHandler,
    UserRepository,
  ],
})
export class AppModule {
}
