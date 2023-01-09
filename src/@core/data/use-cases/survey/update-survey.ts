import { UpdateSurveyUsecase } from '@/domain/usecases'
import { DBUpdateSurvey } from '@/domain/contracts/repos'

export class UpdateSurvey implements UpdateSurveyUsecase{
  constructor (
    private readonly surveyRepo: DBUpdateSurvey
  ) {}

  async update (accountData: UpdateSurveyUsecase.Input): Promise<UpdateSurveyUsecase.Output> {
    const updated = await this.surveyRepo.update(accountData)
    return updated
  }
}
