import { ApiProperty } from "@nestjs/swagger"

export class UpdateAnswerDto {
    @ApiProperty()
    description: string
    @ApiProperty()
    questionId: string
    @ApiProperty()
    userId: string
}
