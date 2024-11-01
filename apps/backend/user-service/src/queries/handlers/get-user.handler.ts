import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from "@nestjs/common";
import { GetUserQuery } from "../get-user.query";
import {  UserEntity } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../interfaces/user-repository.interface";

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor( @Inject('IUserRepository') private readonly userRepository: IUserRepository) {}

  async execute(query: GetUserQuery): Promise<UserEntity> {
    const user = await this.userRepository.findByEmail(query.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
