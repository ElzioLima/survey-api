import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Survey } from './entities/survey.entity';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';

@Module({
  imports: [TypeOrmModule.forFeature([Survey, Question])],
  controllers: [SurveyController],
  providers: [SurveyService]
})
export class SurveyModule {}
