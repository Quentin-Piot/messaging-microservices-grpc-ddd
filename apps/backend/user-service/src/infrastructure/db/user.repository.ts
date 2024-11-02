import { Injectable } from '@nestjs/common';
import {  UserEntity } from "../../domain/entities/user.entity";
import { PrismaService } from "../../prisma/prisma.service";
import { IUserRepository } from "../../interfaces/user-repository.interface";

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(private prisma: PrismaService) {}

    async create(user: UserEntity): Promise<UserEntity> {
        const created = await this.prisma.user.create({
            data: {
                email: user.email,
                password: user.password,
                phoneNumber:user.phoneNumber
            },
        });

        return new UserEntity(
          created.email,
          created.password,
          created.phoneNumber,
          created.createdAt,
          created.updatedAt,
        );
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user) return null;

        return new UserEntity(
          user.email,
          user.password,
          user.phoneNumber,
          user.createdAt,
          user.updatedAt,
        );
    }
}
