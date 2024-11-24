import {
  Inject,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import * as argon2 from "argon2";

import { UserEntity } from "@/domain/entities/user.entity";
import { IUserRepository } from "@/interfaces/user-repository.interface";
import { CheckPasswordCombinationQuery } from "@/queries/check-password-combination.query";

@QueryHandler(CheckPasswordCombinationQuery)
export class CheckPasswordCombinationHandler
  implements IQueryHandler<CheckPasswordCombinationQuery>
{
  constructor(
    @Inject("IUserRepository") private readonly userRepository: IUserRepository,
  ) {}

  async execute(query: CheckPasswordCombinationQuery): Promise<UserEntity> {
    const user = await this.userRepository.findByEmailOrPhoneNumber(
      query.email,
      query.phoneNumber,
    );
    if (!user) {
      throw new UnauthorizedException(
        `Wrong ${query.email ? "email" : "phoneNumber"} and password combination`,
      );
    }

    const verification = await argon2.verify(user.password, query.password);
    if (!verification) {
      throw new UnauthorizedException(
        `Wrong ${query.email ? "email" : "phoneNumber"} and password combination`,
      );
    }
    return user;
  }
}
