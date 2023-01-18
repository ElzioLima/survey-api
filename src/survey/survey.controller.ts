import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SurveyService } from './survey.service';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';

@Controller()
@ApiTags('Questionários')
@ApiResponse({ status: 200, description: 'Ok' })
export class SurveyController {
  constructor(
    private readonly surveyService: SurveyService,
  ) {}

  @Post('questionario')
  async create(@Body() surveyService: CreateSurveyDto) {
    const isCreated = await this.surveyService.create(surveyService);
    if (!isCreated) {
      throw new HttpException('Questionário não criado!', HttpStatus.NO_CONTENT);
    }
    return isCreated;
  }

  @Get('questionarios/?')
  async findAll(
    @Query('limit') limit: number,
    @Query('start') start: number
  ) {
    return await this.surveyService.findAll(limit, start);
  }

  @Get('questionario/:id')
  async findOne(@Param('id') id: string) {
    return await this.surveyService.findOne(id);
  }

  @Patch('questionario/:id')
  async update(@Param('id') id: string, @Body() updateSurveyDto: UpdateSurveyDto) {
    return await this.surveyService.update(id, updateSurveyDto);
  }

  @Delete('questionario/:id')
  async remove(@Param('id') id: string) {
    return await this.surveyService.remove(id);
  }
}
