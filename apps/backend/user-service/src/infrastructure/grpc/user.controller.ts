import { Controller, UseFilters, UsePipes, ValidationPipe } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GetUserQuery } from "../../queries/get-user.query";import {
  CreateUserDto
} from "@quentinpiot/dtos"
import {
  GetUserRequest,
  UserResponse,
  UserServiceController,
} from "@quentinpiot/protos/generated/user";
import {
  ValidationFilter,
} from "@quentinpiot/validation";

import { CreateUserCommand } from "../../commands/create-user.command";

@Controller()
export class UserController implements UserServiceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }

  @GrpcMethod("UserService", "CreateUser")
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseFilters(new ValidationFilter())
  async createUser(request: CreateUserDto): Promise<UserResponse> {

    const user = await this.commandBus.execute(
      new CreateUserCommand(request.email + '', request.password, request.phoneNumber),
    );

    return {
      email: user.email,
      phoneNumber: user.phoneNumber,
      createdAt: user.createdAt?.toISOString(),
      updatedAt: user.updatedAt?.toISOString(),
    };
  }

  @GrpcMethod("UserService", "GetUser")
  async getUser(request: GetUserRequest): Promise<UserResponse> {
    const user = await this.queryBus.execute(
      new GetUserQuery(request.email),
    );

    return {
      email: user.email,
      phoneNumber: user.phoneNumber,
      createdAt: user.createdAt?.toISOString(),
      updatedAt: user.updatedAt?.toISOString(),
    };
  }
}
