import { Module } from '@nestjs/common';
import { SurveyController } from './survey.controller';
import { PgSurveyRepository } from '@/infra/repos/postgres';
import { CreateSurvey, DeleteSurvey, ListOneSurvey, ListSurvey, UpdateSurvey } from '@/data/use-cases';

@Module({
  controllers: [SurveyController],
  providers: [{
    provide: PgSurveyRepository,
    useClass: PgSurveyRepository
  },
  {
    provide: CreateSurvey,
    useFactory: (surveyRepo: PgSurveyRepository) => new CreateSurvey(surveyRepo),
    inject: [PgSurveyRepository]
  },
  {
    provide: ListSurvey,
    useFactory: (surveyRepo: PgSurveyRepository) => new ListSurvey(surveyRepo),
    inject: [PgSurveyRepository]
  },
  {
    provide: ListOneSurvey,
    useFactory: (surveyRepo: PgSurveyRepository) => new ListOneSurvey(surveyRepo),
    inject: [PgSurveyRepository]
  },
  {
    provide: UpdateSurvey,
    useFactory: (surveyRepo: PgSurveyRepository) => new UpdateSurvey(surveyRepo),
    inject: [PgSurveyRepository]
  },
  {
    provide: DeleteSurvey,
    useFactory: (surveyRepo: PgSurveyRepository) => new DeleteSurvey(surveyRepo),
    inject: [PgSurveyRepository]
  }]
})
export class SurveyModule {}
