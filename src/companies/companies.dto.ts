import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { ArrayUnique, IsArray, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CompanyStatus, InactivationReason } from '@prisma/client'

export class CreateCompanyDto {
  @ApiProperty()
  @IsNotEmpty()
  corporateName!: string;

  @ApiProperty()
  @IsNotEmpty()
  address!: string;

  @ApiProperty()
  @IsNotEmpty()
  phone!: string;

  @ApiProperty()
  @IsNotEmpty()
  cnpj!: string;

  @ApiProperty({ type: [String], default: [] })
  @IsArray()
  @IsString({ each: true })
  @ArrayUnique()
  tags!: string[];

  @ApiProperty({ enum: CompanyStatus, enumName: 'CompanyStatus' })
  @IsEnum(CompanyStatus)
  status!: CompanyStatus;

  @ApiProperty({ enum: InactivationReason, isArray: true, enumName: 'InactivationReason', default: [] })
  @IsArray()
  @IsEnum(InactivationReason, { each: true })
  inactivationReasons!: InactivationReason[];
}


export class CompanyResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  corporateName!: string;

  @ApiProperty()
  @IsNotEmpty()
  address!: string;

  @ApiProperty()
  @IsNotEmpty()
  phone!: string;

  @ApiProperty()
  @IsNotEmpty()
  cnpj!: string;

  @ApiProperty()
  @IsEnum(CompanyStatus)
  status!: CompanyStatus;
}

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ enum: CompanyStatus, enumName: 'CompanyStatus' })
  @IsOptional()
  @IsEnum(CompanyStatus)
  status?: CompanyStatus;

  @ApiPropertyOptional({ enum: InactivationReason, isArray: true, enumName: 'InactivationReason' })
  @IsOptional()
  @IsArray()
  @IsEnum(InactivationReason, { each: true })
  inactivationReasons?: InactivationReason[];
}