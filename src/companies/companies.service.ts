import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CompanyResponseDto, CreateCompanyDto, UpdateCompanyDto } from './companies.dto';
import { CompanyStatus } from '@prisma/client';

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}

  private async findCompanyOrThrow(id: number) {
    const company = await this.prisma.company.findUnique({
      where: { id: Number(id) },
      select: { id: true, status: true },
    });

    if (!company) {
      throw new NotFoundException('Empresa não encontrada.');
    }

    return company;
  }

  async findAll(): Promise<CompanyResponseDto[]> {
    return await this.prisma.company.findMany({
      select: { id: true, corporateName: true, cnpj: true, status: true, address: true, phone: true },
    });
  }

  async findById(id: number): Promise<CompanyResponseDto | null> {
    return await this.prisma.company.findUnique({
      where: { id: Number(id) },
      select: { id: true, corporateName: true, cnpj: true, status: true, address: true, phone: true },
    });
  }

  async findByCnpj(cnpj: string) {
    return await this.prisma.company.findUnique({ where: { cnpj } });
  }

  async create(dto: CreateCompanyDto): Promise<CompanyResponseDto> {
    return await this.prisma.company.create({
      data: {
        corporateName: dto.corporateName,
        address: dto.address,
        phone: dto.phone,
        cnpj: dto.cnpj,
        status: dto.status,
        tags: dto.tags ?? [],
        inactivationReasons: dto.inactivationReasons ?? [],
      },
      select: { id: true, corporateName: true, cnpj: true, status: true, address: true, phone: true },
    });
  }

  async update(id: number, dto: UpdateCompanyDto): Promise<CompanyResponseDto> {
    const company = await this.findCompanyOrThrow(id);
    const isReactivation =
      company.status === CompanyStatus.INATIVA &&
      dto.status === CompanyStatus.ATIVA;

    if (company.status === CompanyStatus.INATIVA && !isReactivation) {
      throw new ForbiddenException('Empresa inativa não pode receber registros. Apenas visualização.');
    }

    return await this.prisma.company.update({
      where: { id: Number(id) },
      data: {
        corporateName: dto.corporateName,
        address: dto.address,
        phone: dto.phone,
        status: dto.status,
        tags: dto.tags,
        inactivationReasons: dto.inactivationReasons,
      },
      select: { id: true, corporateName: true, cnpj: true, status: true, address: true, phone: true},
    });
  }
}
