export class UserEntityWithoutId {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly phoneNumber: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}
}

export class UserEntity extends UserEntityWithoutId {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly password: string,
    public readonly phoneNumber: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {
    super(email, password, phoneNumber, createdAt, updatedAt);
  }
}
