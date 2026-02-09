import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class CreateRecordDto{
    @ApiProperty()
    @IsNotEmpty()
    sentDate!: Date

    @ApiProperty()
    @IsNotEmpty()
    type!: string

    @ApiProperty()
    @IsNotEmpty()
    observation!: string

    @ApiProperty()
    @IsNotEmpty()
    lectureConfirmation!: string

    @ApiProperty()
    @IsNotEmpty()
    companyId!: number

}

