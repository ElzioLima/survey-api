import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller()
@ApiTags('Respostas')
@ApiResponse({ status: 200, description: 'Ok' })
export class AnswersController {
  constructor(
    private readonly answersService: AnswersService,
  ) {}

  @Post('questionario/:surveyId/resposta')
  async create(
    @Param('surveyId') surveyId: string,
    @Body() createAnswerDto: CreateAnswerDto
  ) {
    return await this.answersService.create(surveyId, createAnswerDto);
  }

  @Get('questionario/:surveyId/resposta/:answerId')
  async findOne(
    @Param('surveyId') surveyId: string,
    @Param('answerId') answerId: string
  ) {
    return await this.answersService.findOne(surveyId, answerId);
  }

  @Patch('questionario/:surveyId/resposta/:answerId')
  async update(
    @Param('surveyId') surveyId: string,
    @Param('answerId') answerId: string,
    @Body() updateAnswerDto: UpdateAnswerDto
  ) {
    return await this.answersService.update(surveyId, answerId, updateAnswerDto);
  }

  @Delete('questionario/:surveyId/resposta/:answerId')
  async remove(
    @Param('surveyId') surveyId: string,
    @Param('answerId') answerId: string
  ) {
    return await this.answersService.remove(surveyId, answerId);
  }
}
