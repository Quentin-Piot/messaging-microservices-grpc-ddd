export interface IUserRepository {

   save(user: any) : Promise<void>;
}