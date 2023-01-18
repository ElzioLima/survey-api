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
//import { Answer } from '@/answers/entities/answer.entity'
import { Survey } from '@/survey/entities/survey.entity'
import { Answer } from '@/answers/entities/answer.entity';

@Entity({ name: 'questions' })
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  description!: string

  @ManyToOne((type) => Survey, (survey) => survey.questions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    orphanedRowAction: "delete",
    nullable: false
  })
  survey: Survey;

  @OneToMany((type) => Answer, (answer) => answer.question, {
    eager: true
  })
  answers: Answer[];

  @CreateDateColumn({ name: "created_at", nullable: false })
  createdAt!: Date

  @UpdateDateColumn({ name: "updated_at", nullable: false })
  updatedAt!: Date

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt!: Date
}
