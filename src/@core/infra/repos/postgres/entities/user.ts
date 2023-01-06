import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from 'typeorm'

@Entity({ name: 'users' })
export class PgUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column()
  password!: string

  @Column({ unique: true })
  cpf!: string

  @Column({ nullable: true })
  token!: string

  @DeleteDateColumn()
  deletedAt!: Date
}
