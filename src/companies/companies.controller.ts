import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { CompanyResponseDto, CreateCompanyDto } from './companies.dto';
import { CompaniesService } from './companies.service';

@UseGuards(JwtAuthGuard)
@ApiOkResponse({ type: CompanyResponseDto, isArray: true })
@ApiBearerAuth('access-token')
@Controller('companies')
export class CompaniesController {
    constructor(private readonly userService: CompaniesService) { }

    @Get()
    async findAll(): Promise<CompanyResponseDto[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<CompanyResponseDto | null> {
        return this.userService.findById(id);
    }

    @Post()
    async create(@Body() dto: CreateCompanyDto): Promise<CompanyResponseDto> {
        return this.userService.create(dto)
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateCompanyDto): Promise<CompanyResponseDto> {
        return this.userService.update(id, dto)
    }
}
