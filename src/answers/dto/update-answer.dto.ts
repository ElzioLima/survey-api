import { ApiProperty } from "@nestjs/swagger"

export class UpdateAnswerDto {
    @ApiProperty()
    description: string
}
