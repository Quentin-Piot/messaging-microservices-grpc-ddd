import {UserAggregate} from "../domain/user.aggregate";
import { CommandHandler, ICommand, ICommandHandler } from "@nestjs/cqrs";
import { IUserRepository } from "../interfaces/user-repository.interface";

export class CreateUserCommand implements ICommand {
    constructor(
        public readonly email: string,
        public readonly password: string,
    ) {}
}

// src/application/handlers/create-user.handler.ts
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(
        private readonly userRepository: IUserRepository,
    ) {}

    async execute(command: CreateUserCommand): Promise<UserAggregate> {
        const hashedPassword = command.password

        const user = UserAggregate.create({
            email: command.email,
            password: hashedPassword,
        });

        await this.userRepository.save(user);
        return user;
    }
}