import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswersService {

  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) {}

  async create(surveyId: string, createAnswerDto: CreateAnswerDto) {
    return await this.answerRepository.save({
      description: createAnswerDto.description,
      userId: createAnswerDto.userId,
      question: {
        id: createAnswerDto.questionId,
        survey: {
          id: surveyId
        }
      },
      user: {
        id: createAnswerDto.userId
      }
    });
  }

  async findOne(surveyId: string, answerId: string) {
    return await this.answerRepository.findOne({
      where: { id: answerId },
    });
  }

  async update(surveyId: string, answerId: string, updateAnswerDto: UpdateAnswerDto) {
    return await this.answerRepository.update(answerId, {
      description: updateAnswerDto.description
    });
  }

  async remove(surveyId: string, answerId: string) {
    return await this.answerRepository.delete(answerId);
  }
}
