import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  DeleteDateColumn, 
  CreateDateColumn, 
  UpdateDateColumn, 
  ManyToOne,
  OneToMany
} from 'typeorm'
import { PgAnswer } from './answer'
import { PgSurvey } from './survey'

@Entity({ name: 'questions' })
export class PgQuestion {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  description!: string

  @ManyToOne((type) => PgSurvey, (survey) => survey.questions, {
    nullable: false
  })
  survey: PgSurvey;

  @OneToMany((type) => PgAnswer, (answer) => answer.question, {
    cascade: ["remove"]
  })
  answers: PgAnswer[];

  @CreateDateColumn({ name: "created_at", nullable: false })
  createdAt!: Date

  @UpdateDateColumn({ name: "updated_at", nullable: false })
  updatedAt!: Date

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt!: Date
}
