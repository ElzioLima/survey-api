import { User } from '@/domain/entities'
import { ListUserUsecase } from '@/domain/usecases'
import { DBListUser } from '@/domain/contracts/repos'

export class ListUser implements ListUserUsecase{
  constructor (
    private readonly userRepo: DBListUser
  ) {}

  async list (): Promise<ListUserUsecase.Output> {
    const userData = await this.userRepo.list()
    if (userData != null) {
      const userList = userData.map((user) => {
        return new User(user)
      })
      return userList
    }
  }
}
