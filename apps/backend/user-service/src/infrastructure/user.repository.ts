import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserAggregate } from "../domain/user.aggregate";
import { IUserRepository } from "../interfaces/user-repository.interface";


@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
      private readonly prisma: PrismaService,
      private readonly mapper: UserMapper,
    ) {}



    async save(user: UserAggregate): Promise<void> {
        const data = this.mapper.toPersistence(user);
        await this.prisma.user.upsert({
            where: { id: user.id },
            update: data,
            create: data,
        });
    }
}
