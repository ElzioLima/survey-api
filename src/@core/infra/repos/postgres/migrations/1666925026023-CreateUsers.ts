import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUsers1666925026023 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()', // postgres
            generationStrategy: 'uuid',
            isNullable: false
          },
          {
            name: 'name',
            type: 'varchar(200)',
            isNullable: false
          },
          {
            name: 'password',
            type: 'varchar(200)',
            isNullable: false
          },
          {
            name: 'cpf',
            type: 'varchar(200)',
            isUnique: true,
            isNullable: false
          },
          {
            name: 'token',
            type: 'varchar(200)'
          },
          {
            name: 'createdAt',
            type: 'timestamp',  
            default: 'now()',
            isNullable: false
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
            isNullable: false
          },
          {
            name: 'deletedAt',
            type: 'timestamp',
            isNullable: true,
            default: null
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('users')
  }
}
