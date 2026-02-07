import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return await this.prisma.user.findMany()
    }

    async findById(id: number) {
        return await this.prisma.user.findUnique({ where: { id: Number(id) } });
    }

    async findByEmail(email: string) {
        return await this.prisma.user.findUnique({ where: { email } })
    }

    async create(user: Prisma.UserCreateInput) {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt)

        return await this.prisma.user.create({ data: user })
    }

    async update(id: number, user: Prisma.UserCreateInput) {
        return await this.prisma.user.update({
            where: { id: Number(id) },
            data: {
                name: user.name,
                email: user.email,
            }
        });
    }

    async delete(id: number) {
        return await this.prisma.user.delete({ where: { id: Number(id) } })
    }

}
