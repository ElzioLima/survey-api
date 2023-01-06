import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
    @ApiProperty({ required: true })
    name: string;
    @ApiProperty({ required: true })
    password: string;
}
