import { UserEntity } from "../domain/entities/user.entity";

export interface IUserRepository {
   create(user: UserEntity): Promise<UserEntity>;
   findByEmail(email: string): Promise<UserEntity | null>;
}