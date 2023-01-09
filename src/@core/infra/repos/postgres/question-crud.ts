import { PgQuestion, PgSurvey } from '@/infra/repos/postgres/entities'
import { PgRepository } from '@/infra/repos/postgres/repository'
import {
  DBCreateQuestion,
  DBListOneQuestion,
  DBListQuestion,
  DBUpdateQuestion,
  DBDeleteQuestion,
} from '@/domain/contracts/repos'

export class PgQuestionRepository 
  extends 
    PgRepository 
  implements 
    DBCreateQuestion, 
    DBListQuestion, 
    DBUpdateQuestion, 
    DBListOneQuestion, 
    DBDeleteQuestion
{
  async create ({ description, questionCod, surveyId }: DBCreateQuestion.Input): Promise<DBCreateQuestion.Output> {
    const pgSurveyRepo = this.getRepository(PgSurvey)
    const pgQuestionRepo = this.getRepository(PgQuestion)
    const pgSurvey = await pgSurveyRepo.findOne(surveyId)
    if (pgSurvey !== undefined) {
      //pgSurvey.questions = Promise.resolve()
    }
    const pgQuestion = await pgQuestionRepo.save({ description, questionCod })
    if (pgQuestion !== undefined) {
      await this.clearCacheById(["users"])
      return {
        id: pgQuestion.id,
        description: pgQuestion.description,
        questionCod: pgQuestion.questionCod
      }
    }
  }

  async update ({ id, description, questionCod }: DBUpdateQuestion.Input): Promise<DBUpdateQuestion.Output> {
    const pgQuestionRepo = this.getRepository(PgQuestion)
    const pgQuestionUpdated = await pgQuestionRepo.update(id, { description, questionCod })
    if (pgQuestionUpdated !== undefined) {
      const pgQuestion = await pgQuestionRepo.findOne(id)
      if (pgQuestion !== undefined) {
        await this.clearCacheById([`user:${pgQuestion.id}`, "users"])
        return true
      }
    }
  }

  async list ( input: DBListQuestion.Input ): Promise<DBListQuestion.Output> {
    const skip = Number(process.env.PAGINATION_LIMIT) * (input.page - 1)
    const take = Number(process.env.PAGINATION_LIMIT)
    const pgQuestionRepo = this.getRepository(PgQuestion)
    const pgQuestionList = pgQuestionRepo.find({
      cache: {id: `users:skip=${skip}:take=${take}`, milliseconds: 1000 * 60},
      skip,
      take
    })
    return (await pgQuestionList).map(({ id, description, questionCod }) => {
      return {
        id: id ?? undefined,
        description: description ?? undefined,
        questionCod: questionCod ?? undefined,
      }
    })
  }

  async listOne ({ id }: DBListOneQuestion.Input): Promise<DBListOneQuestion.Output> {
    const pgQuestionRepo = this.getRepository(PgQuestion)
    const pgQuestion = await pgQuestionRepo.findOne(id, {cache: {id: `user:${id}`, milliseconds: 1000 * 60}})
    if (pgQuestion !== undefined) {
      return {
        id: pgQuestion.id ?? undefined,
        description: pgQuestion.description ?? undefined,
        questionCod: pgQuestion.questionCod ?? undefined,
    }
    }
  }

  async delete ({ id }: DBDeleteQuestion.Input): Promise<DBDeleteQuestion.Output> {
    const pgQuestionRepo = this.getRepository(PgQuestion)
    const pgQuestion = await pgQuestionRepo.findOne(id)
    if (pgQuestion !== undefined) {
      const pgQuestionDeleted = await pgQuestionRepo.softDelete(id)
      await this.clearCacheById([`user:${pgQuestion.id}`, "users"])
      return true
    }
  }
}
