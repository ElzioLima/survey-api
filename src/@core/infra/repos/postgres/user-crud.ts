import { PgUser } from '@/infra/repos/postgres/entities'
import { PgRepository } from '@/infra/repos/postgres/repository'
import {
  DBCreateUser,
  DBListOneUser,
  DBListUser,
  DBUpdateUser,
  DBDeleteUser,
  UpdateAccessTokenRepository,
  LoadByUniqueCPFRepository
} from '@/domain/contracts/repos'

export class PgUserRepository 
  extends 
    PgRepository 
  implements 
    DBCreateUser, 
    DBListUser, 
    DBUpdateUser, 
    DBListOneUser, 
    DBDeleteUser, 
    UpdateAccessTokenRepository,
    LoadByUniqueCPFRepository
{
  async create ({ name, password, cpf }: DBCreateUser.Input): Promise<DBCreateUser.Output> {
    const pgUserRepo = this.getRepository(PgUser)
    const pgUser = await pgUserRepo.save({ name, password, cpf })
    if (pgUser !== undefined) {
      await this.clearCacheById(["users"])
      return {
        id: pgUser.id,
        name: pgUser.name,
        password: pgUser.password,
        cpf: pgUser.cpf
      }
    }
  }

  async update ({ id, name, password }: DBUpdateUser.Input): Promise<DBUpdateUser.Output> {
    const pgUserRepo = this.getRepository(PgUser)
    const pgUserUpdated = await pgUserRepo.update(id, { name, password })
    if (pgUserUpdated !== undefined) {
      const pgUser = await pgUserRepo.findOne(id)
      if (pgUser !== undefined) {
        await this.clearCacheById([`user:${pgUser.id}`, "users"])
        return true
      }
    }
  }

  async list (): Promise<DBListUser.Output> {
    const pgUserRepo = this.getRepository(PgUser)
    const pgUserList = pgUserRepo.find({cache: {id: "users", milliseconds: 1000 * 60}})
    return (await pgUserList).map(({ id, name, password, cpf }) => {
      return {
        id: id ?? undefined,
        name: name ?? undefined,
        password: password ?? undefined,
        cpf: cpf ?? undefined,
      }
    })
  }

  async listOne ({ id }: DBListOneUser.Input): Promise<DBListOneUser.Output> {
    const pgUserRepo = this.getRepository(PgUser)
    const pgUser = await pgUserRepo.findOne(id, {cache: {id: `user:${id}`, milliseconds: 1000 * 60}})
    if (pgUser !== undefined) {
      return {
        id: pgUser.id ?? undefined,
        name: pgUser.name ?? undefined,
        password: pgUser.password ?? undefined,
        cpf: pgUser.cpf ?? undefined,
    }
    }
  }

  async delete ({ id }: DBDeleteUser.Input): Promise<DBDeleteUser.Output> {
    const pgUserRepo = this.getRepository(PgUser)
    const pgUser = await pgUserRepo.findOne(id)
    if (pgUser !== undefined) {
      const pgUserDeleted = await pgUserRepo.softDelete(id)
      await this.clearCacheById([`user:${pgUser.id}`, "users"])
      return true
    }
  }

  async updateAccessToken ({ id, token }: UpdateAccessTokenRepository.Input): Promise<UpdateAccessTokenRepository.Output> {
    const pgUserRepo = this.getRepository(PgUser)
    await pgUserRepo.update(id, { token })
  }

  async loadByCPF ({ cpf }: LoadByUniqueCPFRepository.Input): Promise<LoadByUniqueCPFRepository.Output> {
    const pgUserRepo = this.getRepository(PgUser)
    const pgUser = await pgUserRepo.findOne({ cpf })
    if (pgUser !== undefined) {
      return true
    }
    return false
  }
}
