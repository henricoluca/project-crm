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
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ContactResponseDto,
  CreateContactDto,
  UpdateContactDto,
} from './contacts.dto';
import { ContactsService } from './contacts.service';

@UseGuards(JwtAuthGuard)
@ApiOkResponse({ type: ContactResponseDto, isArray: true })
@ApiBearerAuth('access-token')
@Controller('companies/:id/contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  async findAll(@Param('id', ParseIntPipe) companyId: number) {
    return this.contactsService.findAll(companyId);
  }

  @Get(':contactId')
  async findById(
    @Param('id', ParseIntPipe) companyId: number,
    @Param('contactId', ParseIntPipe) contactId: number,
  ) {
    return this.contactsService.findById(companyId, contactId);
  }

  @Post()
  async create(
    @Param('id', ParseIntPipe) companyId: number,
    @Body() dto: CreateContactDto,
  ) {
    return this.contactsService.create(companyId, dto);
  }

  @Patch(':contactId')
  async update(
    @Param('id', ParseIntPipe) companyId: number,
    @Param('contactId', ParseIntPipe) contactId: number,
    @Body() dto: UpdateContactDto,
  ) {
    return this.contactsService.update(companyId, contactId, dto);
  }
}
