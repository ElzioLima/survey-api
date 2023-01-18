import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { Question } from './entities/question.entity';
import { Survey } from './entities/survey.entity';

@Injectable()
export class SurveyService {

  constructor (
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>
  ) {}

  async create(createSurveyDto: CreateSurveyDto) {
    const created = await this.surveyRepository.save({
      ...createSurveyDto,
      user: { id: createSurveyDto.userId },
    });
    if (created) {
      return created;
    }
    return false;
  }

  async findAll(limit: number, start: number) {
    const skip = (start - 1) * limit;
    return await this.surveyRepository.find({ skip, take: limit });
  }

  async findOne(id: string) {
    return await this.surveyRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, updateSurveyDto: UpdateSurveyDto) {
    await this.questionRepository.delete(updateSurveyDto.oldQuestions)
    return await this.surveyRepository.save({
      id,
      name: updateSurveyDto.name,
      description: updateSurveyDto.description,
      questions: updateSurveyDto.newQuestions.map((question) => {
        return {
          ...question,
          survey: { id }
        }
      })
    });

  }

  async remove(id: string) {
    await this.surveyRepository.delete(id);
    const oldUser = await this.surveyRepository.findOne(
      {
        where: { id },
      }
    )
    if (!oldUser) {
      return true;
    }
    return false;
  }
}
