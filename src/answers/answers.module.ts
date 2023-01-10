import { Module } from '@nestjs/common';
import { AnswersController } from './answers.controller';
import { PgAnswerRepository } from '@/infra/repos/postgres';
import { CreateAnswer, DeleteAnswer, ListOneAnswer, UpdateAnswer } from '@/data/use-cases/answer';

@Module({
  controllers: [AnswersController],
  providers: [
    {
      provide: PgAnswerRepository,
      useClass: PgAnswerRepository
    },
    {
      provide: CreateAnswer,
      useFactory: (answerRepo: PgAnswerRepository) => new CreateAnswer(answerRepo),
      inject: [PgAnswerRepository]
    },
    {
      provide: ListOneAnswer,
      useFactory: (answerRepo: PgAnswerRepository) => new ListOneAnswer(answerRepo),
      inject: [PgAnswerRepository]
    },
    {
      provide: UpdateAnswer,
      useFactory: (answerRepo: PgAnswerRepository) => new UpdateAnswer(answerRepo),
      inject: [PgAnswerRepository]
    },
    {
      provide: DeleteAnswer,
      useFactory: (answerRepo: PgAnswerRepository) => new DeleteAnswer(answerRepo),
      inject: [PgAnswerRepository]
    }
  ]
})
export class AnswersModule {}
