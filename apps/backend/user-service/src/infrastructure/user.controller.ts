import {Controller} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {GrpcMethod} from "@nestjs/microservices";
import {UserAggregate} from "../domain/user.aggregate";
import {CreateUserCommand} from "../commands/create-user.command";
import { IUserResponse } from "../interfaces/user-response.interface";

@Controller()
export class UserController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @GrpcMethod('UserService', 'CreateUser')
    async createUser(data: CreateUserRequest): Promise<UserResponse> {
        const command = new CreateUserCommand(
            data.email,
            data.password
        );

        const user = await this.commandBus.execute(command);
        return this.mapToResponse(user);
    }
    private mapToResponse(user: UserAggregate): IUserResponse {
        return {
            id: user.id,
            email: user.email,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
}