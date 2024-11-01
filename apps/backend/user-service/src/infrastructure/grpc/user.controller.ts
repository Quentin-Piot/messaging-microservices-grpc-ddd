import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUserQuery } from "../../queries/get-user.query";
import {
    CreateUserRequest,
    GetUserRequest,
    UserResponse,
    UserServiceController,
} from "@quentinpiot/protos/generated/user";
import { CreateUserCommand } from "../../commands/create-user.command";

@Controller()
export class UserController implements UserServiceController{
    constructor(
      private readonly commandBus: CommandBus,
      private readonly queryBus: QueryBus,
    ) {}

    @GrpcMethod('UserService', 'CreateUser')
    async createUser(request: CreateUserRequest): Promise<UserResponse> {
        const user = await this.commandBus.execute(
          new CreateUserCommand(request.email, request.password),
        );

        return {
            email: user.email,
            createdAt: user.createdAt?.toISOString(),
            updatedAt: user.updatedAt?.toISOString(),
        };
    }

    @GrpcMethod('UserService', 'GetUser')
    async getUser(request: GetUserRequest): Promise<UserResponse> {
        const user = await this.queryBus.execute(
          new GetUserQuery(request.email),
        );

        return {
            email: user.email,
            createdAt: user.createdAt?.toISOString(),
            updatedAt: user.updatedAt?.toISOString(),
        };
    }
}
