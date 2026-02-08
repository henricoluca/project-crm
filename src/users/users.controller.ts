import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UserResponseDto } from './users.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';

@ApiOkResponse({ type: UserResponseDto, isArray: true })
@ApiBearerAuth('access-token')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(): Promise<UserResponseDto[]> {
        return this.userService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserResponseDto | null> {
        return this.userService.findById(id);
    }

    @Post()
    async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
        return this.userService.create(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateUserDto): Promise<UserResponseDto> {
        return this.userService.update(id, dto)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.userService.delete(id)
    }
}
