import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { ContactStatus } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateContactDto {
  @ApiProperty()
  @IsNotEmpty()
  name!: string;

  @ApiProperty()
  @IsNotEmpty()
  celular!: string;

  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty({ enum: ContactStatus, enumName: 'ContactStatus' })
  @IsEnum(ContactStatus)
  status!: ContactStatus;
}

export class UpdateContactDto extends PartialType(CreateContactDto) {}

export class ContactResponseDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  celular!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty({ enum: ContactStatus, enumName: 'ContactStatus' })
  status!: ContactStatus;

  @ApiProperty()
  companyId!: number;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
