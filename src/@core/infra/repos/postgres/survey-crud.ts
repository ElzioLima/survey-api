import { PgAnswer, PgQuestion, PgSurvey, PgUser } from '@/infra/repos/postgres/entities'
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
    const pgQuestionRepo = this.getRepository(PgQuestion)
    const pgSurvey = await pgSurveyRepo.save({ name, description, user: Promise.resolve() })
    const pgSurveySaved = await pgSurveyRepo.findOne(pgSurvey.id)
    if (pgSurveySaved !== undefined) {
      const pgUserRepo = this.getRepository(PgUser)
      const pgUser = await pgUserRepo.findOne(userId)
      if (pgUser !== undefined) {
        pgSurveySaved.user = Promise.resolve(pgUser)
      }
      const pgQuestion = await pgQuestionRepo.save(questions)
      if (pgQuestion !== undefined) {
        (await pgSurveySaved.questions).push(...pgQuestion)
        await pgSurveyRepo.save(pgSurveySaved)
      }
    }
    if (pgSurveySaved !== undefined) {
      await this.clearCacheById(["surveys"])
      return {
        id: pgSurveySaved.id,
        name: pgSurveySaved.name,
        description: pgSurveySaved.description,
        questions: (await pgSurveySaved.questions).map(({ id, description, questionCod }) => {
          return {
            id,
            description,
            questionCod
          }
        })
      }
    }
  }

  async update ({ id, name, description, newQuestions, oldQuestions }: DBUpdateSurvey.Input): Promise<DBUpdateSurvey.Output> {
    const pgSurveyRepo = this.getRepository(PgSurvey)
    await pgSurveyRepo.update(id, { name, description })
    const pgSurvey = await pgSurveyRepo.findOne(id, {
      relations: ["questions"]
    })
    if (pgSurvey != null) {
      const pgQuestionRepo = this.getRepository(PgQuestion)
      const pgAnswerRepo = this.getRepository(PgAnswer)
      if (oldQuestions !== undefined && newQuestions !== undefined) {
        const questions = oldQuestions.concat(newQuestions.map(({ id }) => id))
        await pgAnswerRepo.createQueryBuilder().delete().where({ question: In(oldQuestions) }).execute()
      }
        await pgQuestionRepo.remove(await pgSurvey.questions)
      const pgQuestions = await pgQuestionRepo.save(newQuestions)
      if (pgQuestions !== undefined) {
        (await pgSurvey.questions).push(...pgQuestions)
        const pgSurveyUpdated = await pgSurveyRepo.save(pgSurvey)
        pgSurveyRepo.createQueryBuilder()
          .relation(PgSurvey, "questions")
          .of(pgSurveyUpdated)
          .remove(oldQuestions)
        if (pgSurveyUpdated !== undefined) {
          await this.clearCacheById([`survey:${pgSurvey.id}`, "surveys"])
          return true;
        }
      }
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
        questions: await questions ?? undefined
      }
    }))
  }

  async listOne ({ id }: DBListOneSurvey.Input): Promise<DBListOneSurvey.Output> {
    const pgSurveyRepo = this.getRepository(PgSurvey)
    const pgSurvey = await pgSurveyRepo.findOne(id, {
      relations: ["questions"],
      cache: {id: `survey:${id}`, milliseconds: 1000 * 60}
    })
    if (pgSurvey !== undefined) {
      return {
        id: pgSurvey.id ?? undefined,
        name: pgSurvey.name ?? undefined,
        description: pgSurvey.description ?? undefined,
        questions: await pgSurvey.questions
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
