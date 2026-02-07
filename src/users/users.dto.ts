import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
    @ApiProperty()
    @IsEmail()
    readonly email!: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly password!: string;
}

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    name!: string;

    @ApiProperty()
    @IsEmail()
    email!: string;

    @ApiProperty()
    @IsNotEmpty()
    password!: string;
}

export class UpdatePasswordDto {

    @IsNotEmpty()
    @ApiProperty() newPassword!: string;

    @IsNotEmpty()
    @ApiProperty() oldPassword!: string;

}

export class UserResponseDto {
    id!: number;
    name!: string;
    email!: string;
}