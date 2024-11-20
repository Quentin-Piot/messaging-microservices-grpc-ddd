import { ConflictException, Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import * as argon2 from "argon2";

import { CreateUserCommand } from "@/commands/create-user.command";
import { UserEntity } from "@/domain/entities/user.entity";
import { IUserRepository } from "@/interfaces/user-repository.interface";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject("IUserRepository") private readonly userRepository: IUserRepository,
  ) {}

  async execute(command: CreateUserCommand): Promise<UserEntity> {
    const existingUser = await this.userRepository.findByEmailOrPhoneNumber(
      command.email,
      command.phoneNumber,
    );
    if (existingUser) {
      throw new ConflictException("Email already exists");
    }

    const hashedPassword = await argon2.hash(command.password);
    const user = new UserEntity(
      command.email,
      hashedPassword,
      command.phoneNumber,
    );

    return this.userRepository.create(user);
  }
}
