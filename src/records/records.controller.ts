import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RecordsService } from './records.service';
import {
  CreateRecordDto,
  RecordsResponseDto,
  UpdateRecordDto,
} from './records.dto';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiOkResponse({ type: RecordsResponseDto, isArray: true })
@ApiBearerAuth('access-token')
@Controller('companies/:id/records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Get()
  async findAll(@Param('id', ParseIntPipe) companyId: number) {
    return this.recordsService.findAll(companyId);
  }

  @Get(':recordId')
  async findById(
    @Param('id', ParseIntPipe) companyId: number,
    @Param('recordId', ParseIntPipe) recordId: number,
  ) {
    return this.recordsService.findById(companyId, recordId);
  }

  @Post()
  async create(
    @Param('id', ParseIntPipe) companyId: number,
    @Body() dto: CreateRecordDto,
  ) {
    return this.recordsService.create(dto, companyId);
  }

  @Patch(':recordId')
  async update(
    @Param('id', ParseIntPipe) companyId: number,
    @Param('recordId', ParseIntPipe) recordId: number,
    @Body() dto: UpdateRecordDto,
  ) {
    return this.recordsService.update(recordId, dto, companyId);
  }
}
