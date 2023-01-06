import { CreateUserUsecase } from '@/domain/usecases'
import { DBCreateUser, LoadByUniqueCPFRepository, UpdateAccessTokenRepository } from '@/domain/contracts/repos'
import { TokenGenerator, Hasher } from '@/domain/contracts/gateways'
import { NotCreatedUser, NotUniqueCPF } from '@/domain/entities'
import { AccessToken, User } from '@/domain/entities'

export class CreateUser implements CreateUserUsecase {
  constructor (
    private readonly userRepo: DBCreateUser & UpdateAccessTokenRepository & LoadByUniqueCPFRepository,
    private readonly tokenGenerator: TokenGenerator,
    private readonly hasher: Hasher
  ) {}

  async create (accountData: CreateUserUsecase.Input): Promise<CreateUserUsecase.Output> {
    const userExists = await this.userRepo.loadByCPF({ cpf: accountData.cpf })
    if (!userExists) {
      const { encrypted } = await this.hasher.hash({ 
        plaintext: accountData.password 
      })
      const newAccount = await this.userRepo.create({ 
        name: accountData.name, 
        password: encrypted, 
        cpf: accountData.cpf 
      })
      if (newAccount != null) {
        const accessToken = await this.tokenGenerator.generate({ 
          key: newAccount.id.toString(), 
          ...AccessToken 
        })
        await this.userRepo.updateAccessToken({ 
          id: newAccount.id, 
          token: accessToken 
        })
        return new User({
          accessToken,
          name: newAccount.name,
          cpf: newAccount.cpf,
          id: newAccount.id,
          password: newAccount.password
        })
      }
      return new NotCreatedUser()
    } else {
      return new NotUniqueCPF()
    }
  }
}
