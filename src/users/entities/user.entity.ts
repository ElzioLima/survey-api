import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinTable } from 'typeorm'
import { Survey } from '@/survey/entities/survey.entity'
import { Answer } from '@/answers/entities/answer.entity'

@Entity({ name: 'users' })
export class User {
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

  @OneToMany((type) => Survey, (survey) => survey.user)
  surveys: Survey[];

  @OneToMany((type) => Answer, (answer) => answer.user)
  answers: Answer[];

  @CreateDateColumn({ name: "created_at", nullable: false })
  createdAt!: Date

  @UpdateDateColumn({ name: "updated_at", nullable: false })
  updatedAt!: Date

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt!: Date
}
