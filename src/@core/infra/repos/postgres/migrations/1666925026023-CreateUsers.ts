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
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('users')
  }
}
