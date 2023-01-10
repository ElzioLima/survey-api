import { Answer } from '@/domain/entities'
import { ListOneAnswerUsecase } from '@/domain/usecases'
import { DBListOneAnswer } from '@/domain/contracts/repos'

export class ListOneAnswer implements ListOneAnswerUsecase{
  constructor (
    private readonly surveyRepo: DBListOneAnswer
  ) {}

  async listOne (accountData: ListOneAnswerUsecase.Input): Promise<ListOneAnswerUsecase.Output> {
    const surveyData = await this.surveyRepo.listOne(accountData)
    if (surveyData != null) {
      const survey = new Answer(surveyData)
      return survey
    }
  }
}
