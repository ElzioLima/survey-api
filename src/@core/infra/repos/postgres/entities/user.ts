import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

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

  @CreateDateColumn({ nullable: true })
  createdAt!: Date

  @UpdateDateColumn({ nullable: true })
  updatedAt!: Date

  @DeleteDateColumn({ nullable: false })
  deletedAt!: Date
}
