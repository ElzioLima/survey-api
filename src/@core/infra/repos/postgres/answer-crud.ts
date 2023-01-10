import { PgQuestion, PgAnswer, PgUser, PgSurvey } from '@/infra/repos/postgres/entities'
import { PgRepository } from '@/infra/repos/postgres/repository'
import {
  DBCreateAnswer,
  DBListOneAnswer,
  DBUpdateAnswer,
  DBDeleteAnswer
} from '@/domain/contracts/repos'

export class PgAnswerRepository 
  extends 
    PgRepository 
  implements 
    DBCreateAnswer, 
    DBUpdateAnswer, 
    DBListOneAnswer, 
    DBDeleteAnswer
{
  async create ({ description, questionId, userId }: DBCreateAnswer.Input): Promise<DBCreateAnswer.Output> {
    const pgAnswerRepo = this.getRepository(PgAnswer)
    const pgUserRepo = this.getRepository(PgUser)
    const pgQuestionRepo = this.getRepository(PgQuestion)
    const pgUser = await pgUserRepo.findOne(userId)
    const pgQuestion = await pgQuestionRepo.findOne({ 
      where: {
        id: questionId
      } 
    })

    const pgAnswer = pgAnswerRepo.create({
      description,
      user: pgUser,
      question: pgQuestion
    })
    const pgAnswerSaved = await pgAnswerRepo.save(pgAnswer)
    if (pgAnswerSaved !== undefined) {
      await this.clearCacheById(["answers"])
      return {
        id: pgAnswer.id,
        description: pgAnswer.description
      }
    }
  }

  async update ({ id, description }: DBUpdateAnswer.Input): Promise<DBUpdateAnswer.Output> {
    const pgAnswerRepo = this.getRepository(PgAnswer)
    await pgAnswerRepo.update(id, { description })
    await this.clearCacheById([`answer:${id}`, "answers"])
    return true
  }

  async listOne ({ id }: DBListOneAnswer.Input): Promise<DBListOneAnswer.Output> {
    const pgAnswerRepo = this.getRepository(PgAnswer)
    const pgAnswer = await pgAnswerRepo.findOne(id, {
      cache: {id: `answer:${id}`, milliseconds: 1000 * 60}
    })
    if (pgAnswer !== undefined) {
      return {
        id: pgAnswer.id ?? undefined,
        description: pgAnswer.description ?? undefined
      }
    }
  }

  async delete ({ id }: DBDeleteAnswer.Input): Promise<DBDeleteAnswer.Output> {
    const pgAnswerRepo = this.getRepository(PgAnswer)
    const pgAnswer = await pgAnswerRepo.findOne(id)
    if (pgAnswer !== undefined) {
      const pgAnswerDeleted = await pgAnswerRepo.delete(id)
      await this.clearCacheById([`answer:${pgAnswer.id}`, "answers"])
      return true
    }
  }
}
