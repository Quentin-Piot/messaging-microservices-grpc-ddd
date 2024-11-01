import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ConflictException, Inject } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import { CreateUserCommand } from "../create-user.command";
import { IUserRepository } from "../../interfaces/user-repository.interface";
import { UserEntity } from "../../domain/entities/user.entity";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor( @Inject('IUserRepository') private readonly userRepository: IUserRepository) {}

    async execute(command: CreateUserCommand): Promise<UserEntity> {
        const existingUser = await this.userRepository.findByEmail(command.email);
        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(command.password, 10);
        const user = new UserEntity(command.email, hashedPassword);

        return this.userRepository.create(user);
    }
}