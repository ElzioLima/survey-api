import { User } from '@/domain/entities'
import { ListOneUserUsecase } from '@/domain/usecases'
import { DBListOneUser } from '@/domain/contracts/repos'

export class ListOneUser implements ListOneUserUsecase{
  constructor (
    private readonly userRepo: DBListOneUser
  ) {}

  async listOne (accountData: ListOneUserUsecase.Input): Promise<ListOneUserUsecase.Output> {
    const userData = await this.userRepo.listOne(accountData)
    if (userData != null) {
      const user = new User(userData)
      return user
    }
  }
}
