import { ApiProperty } from "@nestjs/swagger";

export class UpdateSurveyDto {
    @ApiProperty({ required: true })
    name: string;
    @ApiProperty({ required: true })
    description: string;
    @ApiProperty({ required: true })
    newQuestions: {
        id: string;
        description: string;
        questionCod: string;
    }[];
    @ApiProperty({ required: true })
    oldQuestions: string[];
}
