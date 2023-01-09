import { Survey } from '@/domain/entities'
import { ListSurveyUsecase } from '@/domain/usecases'
import { DBListSurvey } from '@/domain/contracts/repos'

export class ListSurvey implements ListSurveyUsecase{
  constructor (
    private readonly surveyRepo: DBListSurvey
  ) {}

  async list (input: ListSurveyUsecase.Input): Promise<ListSurveyUsecase.Output> {
    const surveyData = await this.surveyRepo.list({ page: input.page })
    if (surveyData != null) {
      const surveyList = surveyData.map((survey) => {
        return new Survey(survey)
      })
      return surveyList
    }
  }
}
