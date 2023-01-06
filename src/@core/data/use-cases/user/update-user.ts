import { UpdateUserUsecase } from '@/domain/usecases'
import { DBUpdateUser } from '@/domain/contracts/repos'

export class UpdateUser implements UpdateUserUsecase{
  constructor (
    private readonly userRepo: DBUpdateUser
  ) {}

  async update (accountData: UpdateUserUsecase.Input): Promise<UpdateUserUsecase.Output> {
    const updated = await this.userRepo.update(accountData)
    return updated
  }
}
