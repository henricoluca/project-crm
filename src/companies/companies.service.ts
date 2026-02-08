import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CompanyResponseDto, CreateCompanyDto } from "./companies.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class CompaniesService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll(): Promise<CompanyResponseDto[]> {
        return await this.prisma.company.findMany({ select: { corporateName: true, cnpj: true, status: true } })
    }

    async findById(id: number): Promise<CompanyResponseDto | null> {
        return await this.prisma.company.findUnique({ where: { id: Number(id) }, select: { corporateName: true, cnpj: true, status: true } });
    }

    async findByCnpj(cnpj: string) {
        return await this.prisma.company.findUnique({ where: { cnpj } })
    }

    async create(dto: CreateCompanyDto): Promise<CompanyResponseDto> {
        return await this.prisma.company.create({ data: dto, select: { corporateName: true, cnpj: true, status: true } })
    }

    async update(id: number, dto: CreateCompanyDto): Promise<CompanyResponseDto> {
        return await this.prisma.company.update({
            where: { id: Number(id) },
            data: {
                corporateName: dto.corporateName,
                phone: dto.phone,
                status: dto.status,
                tags: dto.tags
            },
            select: { corporateName: true, cnpj: true, status: true }
        });
    }

}