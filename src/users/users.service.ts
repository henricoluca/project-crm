import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from './users.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findAll(): Promise<UserResponseDto[]> {
        return await this.prisma.user.findMany({ select: { id: true, name: true, email: true } })
    }

    async findById(id: number): Promise<UserResponseDto | null> {
        return await this.prisma.user.findUnique({ where: { id: Number(id) }, select: { id: true, name: true, email: true } });
    }

    async findByEmail(email: string) {
        return await this.prisma.user.findUnique({ where: { email } })
    }

    async create(user: Prisma.UserCreateInput): Promise<UserResponseDto> {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt)

        return await this.prisma.user.create({ data: user, select: { id: true, name: true, email: true } })
    }

    async update(id: number, user: Prisma.UserCreateInput): Promise<UserResponseDto> {
        return await this.prisma.user.update({
            where: { id: Number(id) },
            data: {
                name: user.name,
                email: user.email,
            },
            select: { id: true, name: true, email: true }
        });
    }

    async delete(id: number) {
        return await this.prisma.user.delete({ where: { id: Number(id) } })
    }

}
