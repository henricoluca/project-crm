import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { RecordType } from '@prisma/client';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateRecordDto {
  @ApiProperty()
  @IsDateString()
  sentDate!: string;

  @ApiProperty({ enum: RecordType, enumName: 'RecordType' })
  @IsEnum(RecordType)
  type!: RecordType;

  @ApiPropertyOptional()
  @IsOptional()
  observation?: string;

  @ApiProperty()
  @IsBoolean()
  lectureConfirmation!: boolean;
}

export class UpdateRecordDto extends PartialType(CreateRecordDto) {}

export class RecordsResponseDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  sentDate!: Date;

  @ApiProperty({ enum: RecordType, enumName: 'RecordType' })
  type!: RecordType;

  @ApiProperty()
  lectureConfirmation!: boolean;

  @ApiPropertyOptional()
  observation?: string | null;

  @ApiPropertyOptional()
  companyId?: number | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
