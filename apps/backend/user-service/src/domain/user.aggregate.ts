import { AggregateRoot } from '@nestjs/cqrs';

export class UserAggregate extends AggregateRoot {
    readonly id: string;
    readonly email: string;
    readonly password: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;

    constructor(id: string) {
        super();
        this.id = id;
    }

    public static create(props: CreateUserProps): UserAggregate {
        const user = new UserAggregate(uuidv4());

        user.apply(new UserCreatedEvent({
            ...props,
            id: user.id,
            createdAt: new Date(),
            updatedAt: new Date()
        }));

        return user;
    }

}
