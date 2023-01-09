import { CreateSurveyUsecase } from '@/domain/usecases'
import { DBCreateSurvey, DBListOneUser } from '@/domain/contracts/repos'
import { Survey } from '@/domain/entities'

export class CreateSurvey implements CreateSurveyUsecase {
  constructor (
    private readonly surveyRepo: DBCreateSurvey
  ) {}

  async create (accountData: CreateSurveyUsecase.Input): Promise<CreateSurveyUsecase.Output> {
    const surveyData = await this.surveyRepo.create(accountData)
    if (surveyData != null) {
      const survey = new Survey(surveyData)
      return survey
    } 
  }
}
