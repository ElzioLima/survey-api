import { ApiProperty } from "@nestjs/swagger"

export class CreateAnswerDto {
    @ApiProperty()
    description: string
    @ApiProperty()
    questionId: string
    @ApiProperty()
    userId: string
}
