import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import {
  CreateRecordDto,
  RecordsResponseDto,
  UpdateRecordDto,
} from './records.dto';
import { CompanyStatus, Prisma } from '@prisma/client';

@Injectable()
export class RecordsService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly recordSelect = {
    id: true,
    sentDate: true,
    type: true,
    lectureConfirmation: true,
    observation: true,
    companyId: true,
    createdAt: true,
    updatedAt: true,
  } satisfies Prisma.RecordSelect;

  private async findCompanyOrThrow(companyId: number) {
    const company = await this.prisma.company.findUnique({
      where: { id: Number(companyId) },
      select: { id: true, status: true },
    });

    if (!company) {
      throw new NotFoundException('Empresa não encontrada');
    }

    return company;
  }

  private async ensureCompanyCanReceiveRecords(companyId: number) {
    const company = await this.findCompanyOrThrow(companyId);

    if (company.status === CompanyStatus.INATIVA) {
      throw new ForbiddenException('Empresa inativa.');
    }
  }

  async findAll(companyId: number): Promise<RecordsResponseDto[]> {
    await this.findCompanyOrThrow(companyId);

    return this.prisma.record.findMany({
      where: { companyId: Number(companyId) },
      select: this.recordSelect,
      orderBy: { sentDate: 'desc' },
    });
  }

  async findById(
    companyId: number,
    recordId: number,
  ): Promise<RecordsResponseDto | null> {
    await this.findCompanyOrThrow(companyId);

    const record = await this.prisma.record.findFirst({
      where: { id: Number(recordId), companyId: Number(companyId) },
      select: this.recordSelect,
    });

    if (!record) {
      throw new NotFoundException('Registro não encontrado.');
    }

    return record;
  }

  async create(
    dto: CreateRecordDto,
    companyId: number,
  ): Promise<RecordsResponseDto> {
    await this.ensureCompanyCanReceiveRecords(companyId);

    return this.prisma.record.create({
      data: {
        sentDate: new Date(dto.sentDate),
        type: dto.type,
        lectureConfirmation: dto.lectureConfirmation,
        companyId: Number(companyId),
        observation: dto.observation ?? null,
      },
      select: this.recordSelect,
    });
  }

  async update(
    recordId: number,
    dto: UpdateRecordDto,
    companyId: number,
  ): Promise<RecordsResponseDto> {
    await this.ensureCompanyCanReceiveRecords(companyId);
    await this.findById(companyId, recordId);

    return await this.prisma.record.update({
      where: { id: Number(recordId) },
      data: {
        ...(dto.sentDate !== undefined
          ? { sentDate: new Date(dto.sentDate) }
          : {}),
        ...(dto.type !== undefined ? { type: dto.type } : {}),
        ...(dto.lectureConfirmation !== undefined
          ? { lectureConfirmation: dto.lectureConfirmation }
          : {}),
        ...(dto.observation !== undefined
          ? { observation: dto.observation }
          : {}),
      },
      select: this.recordSelect,
    });
  }
}
