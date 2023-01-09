import { DBDeleteSurvey } from '@/domain/contracts/repos'
import { DeleteSurveyUsecase } from '@/domain/usecases'

export class DeleteSurvey implements DeleteSurveyUsecase{
  constructor (
    private readonly surveyRepo: DBDeleteSurvey
  ) {}

  async delete (accountData: DeleteSurveyUsecase.Input): Promise<DeleteSurveyUsecase.Output> {
    const created = await this.surveyRepo.delete(accountData)
    return created
  }
}
