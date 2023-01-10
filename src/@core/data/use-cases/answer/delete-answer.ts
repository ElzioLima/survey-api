import { DBDeleteAnswer } from '@/domain/contracts/repos'
import { DeleteAnswerUsecase } from '@/domain/usecases'

export class DeleteAnswer implements DeleteAnswerUsecase{
  constructor (
    private readonly surveyRepo: DBDeleteAnswer
  ) {}

  async delete (accountData: DeleteAnswerUsecase.Input): Promise<DeleteAnswerUsecase.Output> {
    const created = await this.surveyRepo.delete(accountData)
    return created
  }
}
