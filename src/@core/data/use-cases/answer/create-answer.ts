import { CreateAnswerUsecase } from '@/domain/usecases'
import { DBCreateAnswer } from '@/domain/contracts/repos'
import { Answer } from '@/domain/entities'

export class CreateAnswer implements CreateAnswerUsecase {
  constructor (
    private readonly surveyRepo: DBCreateAnswer
  ) {}

  async create (accountData: CreateAnswerUsecase.Input): Promise<CreateAnswerUsecase.Output> {
    const surveyData = await this.surveyRepo.create(accountData)
    if (surveyData != null) {
      const survey = new Answer(surveyData)
      return survey
    } 
  }
}
