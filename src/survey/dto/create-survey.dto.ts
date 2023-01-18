import { ApiProperty } from "@nestjs/swagger";

export class CreateSurveyDto {
    @ApiProperty({ required: true })
    name: string;
    @ApiProperty({ required: true })
    description: string;
    @ApiProperty({ 
        required: true,
        type: [Array<Object>], 
    })
    questions: {
        description: string;
    }[]
    @ApiProperty({ required: true })
    userId: string;
}
