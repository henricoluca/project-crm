import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateCompanyDto {
    @ApiProperty()
    @IsNotEmpty()
    corporateName!: string;

    @ApiProperty()
    @IsEmail()
    address!: string;

    @ApiProperty()
    @IsNotEmpty()
    phone!: string;

    @ApiProperty()
    @IsNotEmpty()
    cnpj!: string;

    @ApiProperty()
    @IsNotEmpty()
    tags!: string;

    @ApiProperty()
    @IsNotEmpty()
    status!: string;

    @ApiProperty()
    @IsNotEmpty()
    inactivationReasons!: string;
}

export class CompanyResponseDto {
    @ApiProperty()
    @IsNotEmpty()
    corporateName!: string;

    @ApiProperty()
    @IsEmail()
    address!: string;

    @ApiProperty()
    @IsNotEmpty()
    phone!: string;

    @ApiProperty()
    @IsNotEmpty()
    cnpj!: string;

    @ApiProperty()
    @IsNotEmpty()
    status!: string;
}