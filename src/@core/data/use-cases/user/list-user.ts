import { User } from '@/domain/entities'
import { ListUserUsecase } from '@/domain/usecases'
import { DBListUser } from '@/domain/contracts/repos'

export class ListUser implements ListUserUsecase{
  constructor (
    private readonly userRepo: DBListUser
  ) {}

  async list (input: ListUserUsecase.Input): Promise<ListUserUsecase.Output> {
    const userData = await this.userRepo.list({ page: input.page })
    if (userData != null) {
      const userList = userData.map((user) => {
        return new User(user)
      })
      return userList
    }
  }
}
