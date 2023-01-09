import { Survey } from '@/domain/entities'
import { ListOneSurveyUsecase } from '@/domain/usecases'
import { DBListOneSurvey } from '@/domain/contracts/repos'

export class ListOneSurvey implements ListOneSurveyUsecase{
  constructor (
    private readonly surveyRepo: DBListOneSurvey
  ) {}

  async listOne (accountData: ListOneSurveyUsecase.Input): Promise<ListOneSurveyUsecase.Output> {
    const surveyData = await this.surveyRepo.listOne(accountData)
    if (surveyData != null) {
      const survey = new Survey(surveyData)
      return survey
    }
  }
}
