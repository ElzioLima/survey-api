import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinTable } from 'typeorm'
import { PgSurvey } from './survey'

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

  @OneToMany((type) => PgSurvey, (survey) => survey.user)
  surveys: Promise<PgSurvey[]>;

  @CreateDateColumn({ name: "created_at", nullable: false })
  createdAt!: Date

  @UpdateDateColumn({ name: "updated_at", nullable: false })
  updatedAt!: Date

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt!: Date
}
