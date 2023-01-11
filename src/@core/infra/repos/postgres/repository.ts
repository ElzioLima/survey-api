import { PgConnection } from '@/infra/repos/postgres/helpers'

import { ObjectLiteral, ObjectType, Repository } from 'typeorm'

export abstract class PgRepository {
  constructor (private readonly connection: PgConnection = PgConnection.getInstance()) {}

  getRepository<Entity extends ObjectLiteral> (entity: ObjectType<Entity>): Repository<Entity> {
    return this.connection.getRepository(entity)
  }

  async transaction ( query: () => {} ): Promise<void> {
    await this.connection.openTransaction()
    try {
      await query()
      await this.connection.commit()
    } catch (error) {
      await this.connection.rollback()
      throw error
    } finally {
      await this.connection.closeTransaction()
    }
  }
  
  async clearCacheById (cacheIds: string[]): Promise<void> {
    await this.connection.clearCacheById(cacheIds)
  }
}
