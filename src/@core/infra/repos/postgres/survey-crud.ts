import { PgQuestion, PgSurvey } from '@/infra/repos/postgres/entities'
import { PgRepository } from '@/infra/repos/postgres/repository'
import {
  DBCreateSurvey,
  DBListOneSurvey,
  DBListSurvey,
  DBUpdateSurvey,
  DBDeleteSurvey
} from '@/domain/contracts/repos'
import { In } from 'typeorm'

export class PgSurveyRepository 
  extends 
    PgRepository 
  implements 
    DBCreateSurvey, 
    DBListSurvey, 
    DBUpdateSurvey, 
    DBListOneSurvey, 
    DBDeleteSurvey
{
  async create ({ name, description, questions, userId }: DBCreateSurvey.Input): Promise<DBCreateSurvey.Output> {
    const pgSurveyRepo = this.getRepository(PgSurvey)
    const pgSurvey = await pgSurveyRepo.save({ name, description, user: { id: userId }, questions }, {
      transaction: true
    })
    if (pgSurvey !== undefined) {
      await this.clearCacheById(["surveys"])
      return {
        id: pgSurvey.id,
        name: pgSurvey.name,
        description: pgSurvey.description,
        questions: pgSurvey.questions
      }
    }
  }

  async update ({ id, name, description, newQuestions, oldQuestions }: DBUpdateSurvey.Input): Promise<DBUpdateSurvey.Output> {
    const pgSurveyRepo = this.getRepository(PgSurvey)
    let pgSurvey = null
    await this.transaction( async () => {
      console.log(oldQuestions)
      const pgQuestionRepo = this.getRepository(PgQuestion)
      const pgQuestions = await pgQuestionRepo.find({
        where: { id: In(oldQuestions) },
        select: ["id"]
      })
      if (pgQuestions.length > 0) {
        await pgQuestionRepo.delete(pgQuestions.map(({id}) => id))
      }
      pgSurvey = await pgSurveyRepo.update(id, { name, description })
      await pgQuestionRepo.save(newQuestions.map((question) => {
        return {
          ...question,
          survey: { id }
        }
      }))
    })
    if (pgSurvey !== undefined) {
      await this.clearCacheById([`survey:${id}`, "surveys"])
      return true;
    }
  }

  async list ( input: DBListSurvey.Input ): Promise<DBListSurvey.Output> {
    const skip = Number(process.env.PAGINATION_LIMIT) * (input.page - 1)
    const take = Number(process.env.PAGINATION_LIMIT)
    const pgSurveyRepo = this.getRepository(PgSurvey)
    const pgSurveyList = await pgSurveyRepo.find({
      relations: ["questions"],
      cache: {id: `surveys:skip=${skip}:take=${take}`, milliseconds: 1000 * 60},
      skip,
      take
    })
    console.log(JSON.stringify(pgSurveyList))
    return await Promise.all(pgSurveyList.map(async ({ id, name, description, questions }) => {
      return {
        id: id ?? undefined,
        name: name ?? undefined,
        description: description ?? undefined,
        questions: questions ?? undefined
      }
    }))
  }

  async listOne ({ id }: DBListOneSurvey.Input): Promise<DBListOneSurvey.Output> {
    const pgSurveyRepo = this.getRepository(PgSurvey)
    const pgSurvey = await pgSurveyRepo.findOne(id, {
      cache: {id: `survey:${id}`, milliseconds: 1000 * 60}
    })
    if (pgSurvey !== undefined) {
      return {
        id: pgSurvey.id ?? undefined,
        name: pgSurvey.name ?? undefined,
        description: pgSurvey.description ?? undefined,
        questions: pgSurvey.questions
      }
    }
  }

  async delete ({ id }: DBDeleteSurvey.Input): Promise<DBDeleteSurvey.Output> {
    const pgSurveyRepo = this.getRepository(PgSurvey)
    const pgSurvey = await pgSurveyRepo.findOne(id)
    if (pgSurvey !== undefined) {
      const pgSurveyDeleted = await pgSurveyRepo.delete(id)
      await this.clearCacheById([`survey:${pgSurvey.id}`, "surveys"])
      return true
    }
  }
}
