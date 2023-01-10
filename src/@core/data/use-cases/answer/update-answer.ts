import { UpdateAnswerUsecase } from '@/domain/usecases'
import { DBUpdateAnswer } from '@/domain/contracts/repos'

export class UpdateAnswer implements UpdateAnswerUsecase{
  constructor (
    private readonly answerRepo: DBUpdateAnswer
  ) {}

  async update (accountData: UpdateAnswerUsecase.Input): Promise<UpdateAnswerUsecase.Output> {
    const updated = await this.answerRepo.update(accountData)
    return updated
  }
}
