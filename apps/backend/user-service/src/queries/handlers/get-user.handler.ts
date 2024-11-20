import { UserEntity } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../interfaces/user-repository.interface";
import { GetUserQuery } from "../get-user.query";

import { Inject, NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(
    @Inject("IUserRepository") private readonly userRepository: IUserRepository,
  ) {}

  async execute(query: GetUserQuery): Promise<UserEntity> {
    const user = await this.userRepository.findByEmailOrPhoneNumber(
      query.email,
      query.phoneNumber,
    );
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }
}
