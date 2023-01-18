import { ApiProperty } from '@nestjs/swagger';

export class AuthUserDto {
    @ApiProperty({ required: true })
    cpf: string;
    @ApiProperty({ required: true })
    password: string;
}
