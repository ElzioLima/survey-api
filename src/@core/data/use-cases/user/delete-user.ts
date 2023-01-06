import { DBDeleteUser } from '@/domain/contracts/repos'
import { DeleteUserUsecase } from '@/domain/usecases'

export class DeleteUser implements DeleteUserUsecase{
  constructor (
    private readonly userRepo: DBDeleteUser
  ) {}

  async delete (accountData: DeleteUserUsecase.Input): Promise<DeleteUserUsecase.Output> {
    const created = await this.userRepo.delete(accountData)
    return created
  }
}
