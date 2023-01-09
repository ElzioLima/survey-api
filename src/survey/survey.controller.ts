import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { CreateSurvey, UpdateSurvey, ListSurvey, ListOneSurvey, DeleteSurvey } from '@/data/use-cases';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Questionários')
@ApiResponse({ status: 200, description: 'Ok' })
export class SurveyController {
  constructor(
    private readonly createSurvey: CreateSurvey,
    private readonly updateSurvey: UpdateSurvey,
    private readonly listSurvey: ListSurvey,
    private readonly listOneSurvey: ListOneSurvey,
    private readonly deleteSurvey: DeleteSurvey
  ) {}

  @Post('questionario')
  create(@Body() createSurveyDto: CreateSurveyDto) {
    return this.createSurvey.create(createSurveyDto);
  }

  @Get('questionarios/:page')
  findAll(@Param('page') page: number) {
    return this.listSurvey.list({ page });
  }

  @Get('questionario/:id')
  findOne(@Param('id') id: string) {
    return this.listOneSurvey.listOne({ id });
  }

  @Patch('questionario/:id')
  update(@Param('id') id: string, @Body() updateSurveyDto: UpdateSurveyDto) {
    return this.updateSurvey.update({ id, ...updateSurveyDto });
  }

  @Delete('questionario/:id')
  remove(@Param('id') id: string) {
    return this.deleteSurvey.delete({ id });
  }
}
