import { UserEntity } from "../domain/entities/user.entity";

export interface IUserRepository {
  create(user: UserEntity): Promise<UserEntity>;
  findByEmailOrPhoneNumber(
    email: string,
    phoneNumber: string,
  ): Promise<UserEntity | null>;
}
