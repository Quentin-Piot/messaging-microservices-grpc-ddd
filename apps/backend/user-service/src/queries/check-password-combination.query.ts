export class CheckPasswordCombinationQuery {
  constructor(
    public readonly password: string,
    public readonly email: string,
    public readonly phoneNumber: string,
  ) {}
}
