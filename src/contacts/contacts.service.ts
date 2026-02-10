import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import {
  ContactResponseDto,
  CreateContactDto,
  UpdateContactDto,
} from './contacts.dto';

@Injectable()
export class ContactsService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly contactSelect = {
    id: true,
    name: true,
    celular: true,
    email: true,
    status: true,
    companyId: true,
    createdAt: true,
    updatedAt: true,
  } satisfies Prisma.ContactSelect;

  private async findCompanyOrThrow(companyId: number) {
    const company = await this.prisma.company.findUnique({
      where: { id: Number(companyId) },
      select: { id: true },
    });

    if (!company) {
      throw new NotFoundException('Empresa não encontrada.');
    }
  }

  async findAll(companyId: number): Promise<ContactResponseDto[]> {
    await this.findCompanyOrThrow(companyId);

    return this.prisma.contact.findMany({
      where: { companyId: Number(companyId) },
      select: this.contactSelect,
      orderBy: { name: 'asc' },
    });
  }

  async findById(companyId: number, contactId: number): Promise<ContactResponseDto> {
    await this.findCompanyOrThrow(companyId);

    const contact = await this.prisma.contact.findFirst({
      where: { id: Number(contactId), companyId: Number(companyId) },
      select: this.contactSelect,
    });

    if (!contact) {
      throw new NotFoundException('Contato não encontrado.');
    }

    return contact;
  }

  async create(companyId: number, dto: CreateContactDto): Promise<ContactResponseDto> {
    await this.findCompanyOrThrow(companyId);

    try {
      return await this.prisma.contact.create({
        data: {
          name: dto.name,
          celular: dto.celular,
          email: dto.email,
          status: dto.status,
          companyId: Number(companyId),
        },
        select: this.contactSelect,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('E-mail já está em uso.');
      }
      throw error;
    }
  }

  async update(
    companyId: number,
    contactId: number,
    dto: UpdateContactDto,
  ): Promise<ContactResponseDto> {
    await this.findCompanyOrThrow(companyId);
    await this.findById(companyId, contactId);

    try {
      return await this.prisma.contact.update({
        where: { id: Number(contactId) },
        data: {
          ...(dto.name !== undefined ? { name: dto.name } : {}),
          ...(dto.celular !== undefined ? { celular: dto.celular } : {}),
          ...(dto.email !== undefined ? { email: dto.email } : {}),
          ...(dto.status !== undefined ? { status: dto.status } : {}),
        },
        select: this.contactSelect,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('E-mail já está em uso.');
      }
      throw error;
    }
  }
}
