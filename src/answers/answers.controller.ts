import { CreateAnswer, DeleteAnswer, ListOneAnswer, UpdateAnswer } from '@/data/use-cases/answer';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller()
export class AnswersController {
  constructor(
    private readonly createAnswer: CreateAnswer,
    private readonly updateAnswer: UpdateAnswer,
    private readonly listOneAnswer: ListOneAnswer,
    private readonly deleteAnswer: DeleteAnswer
  ) {}

  @Post('questionario/:id/resposta')
  create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.createAnswer.create(createAnswerDto);
  }

  @Get('questionario/:id/resposta/:id')
  findOne(@Param('id') id: string) {
    return this.listOneAnswer.listOne({ id });
  }

  @Patch('questionario/:id/resposta/:id')
  update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.updateAnswer.update({ id, ...updateAnswerDto });
  }

  @Delete('questionario/:id/resposta/:id')
  remove(@Param('id') id: string) {
    return this.deleteAnswer.delete({ id });
  }
}
