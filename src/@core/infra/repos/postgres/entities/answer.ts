import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  DeleteDateColumn, 
  CreateDateColumn, 
  UpdateDateColumn, 
  ManyToOne
} from 'typeorm'
import { PgQuestion } from './question'
import { PgUser } from './user'

@Entity({ name: 'answers' })
export class PgAnswer {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  description!: string

  @ManyToOne((type) => PgQuestion, (question) => question.answers, {
    onDelete: "CASCADE",
    cascade: ["insert"]
  })
  question: PgQuestion;

  @ManyToOne((type) => PgUser, (user) => user.answers, {
    onDelete: "CASCADE",
    cascade: ["insert"]
  })
  user: PgUser;

  @CreateDateColumn({ name: "created_at", nullable: false })
  createdAt!: Date

  @UpdateDateColumn({ name: "updated_at", nullable: false })
  updatedAt!: Date

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt!: Date
}
