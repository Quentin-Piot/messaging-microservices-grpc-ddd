import {
  Controller,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GrpcMethod } from "@nestjs/microservices";

import { CreateUserDto } from "@quentinpiot/dtos";
import { EmailPhoneNumberPasswordDto } from "@quentinpiot/dtos";
import {
  GetUserRequest,
  UserResponse,
  UserServiceController,
} from "@quentinpiot/protos/generated/user";
import { ValidationFilter } from "@quentinpiot/validation";

import { CreateUserCommand } from "@/commands/create-user.command";
import { CheckPasswordCombinationQuery } from "@/queries/check-password-combination.query";
import { GetUserQuery } from "@/queries/get-user.query";

@Controller()
export class UserController implements UserServiceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @GrpcMethod("UserService", "CreateUser")
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseFilters(new ValidationFilter())
  async createUser(request: CreateUserDto): Promise<UserResponse> {
    const user = await this.commandBus.execute(
      new CreateUserCommand(
        request.email + "",
        request.password,
        request.phoneNumber,
      ),
    );

    return {
      id: user.id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      createdAt: user.createdAt?.toISOString(),
      updatedAt: user.updatedAt?.toISOString(),
    };
  }

  @GrpcMethod("UserService", "GetUser")
  async getUser(request: GetUserRequest): Promise<UserResponse> {
    const user = await this.queryBus.execute(
      new GetUserQuery(request.email, request.phoneNumber),
    );

    return {
      id: user.id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      createdAt: user.createdAt?.toISOString(),
      updatedAt: user.updatedAt?.toISOString(),
    };
  }

  @GrpcMethod("UserService", "CheckPasswordCombination")
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseFilters(new ValidationFilter())
  async checkPasswordCombination(
    request: EmailPhoneNumberPasswordDto,
  ): Promise<UserResponse> {
    /*  if (!request.email && !request.phoneNumber)
      throw new BadRequestException("Email or Phone Number is required");*/
    const user = await this.queryBus.execute(
      new CheckPasswordCombinationQuery(
        request.password,
        request.email,
        request.phoneNumber,
      ),
    );

    return {
      id: user.id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      createdAt: user.createdAt?.toISOString(),
      updatedAt: user.updatedAt?.toISOString(),
    };
  }
}
