import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  DeleteDateColumn, 
  CreateDateColumn, 
  UpdateDateColumn, 
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne
} from 'typeorm'
import { PgQuestion } from './question'
import { PgUser } from './user'

@Entity({ name: 'surveys' })
export class PgSurvey {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column()
  description!: string

  @ManyToOne((type) => PgUser, (user) => user.surveys)
  user: Promise<PgUser>;

  @OneToMany((type) => PgQuestion, (question) => question.survey, {
    onDelete: "CASCADE",
    cascade: ["update", "remove"]
  })
  questions: Promise<PgQuestion[]>;

  @CreateDateColumn({ name: "created_at", nullable: false })
  createdAt!: Date

  @UpdateDateColumn({ name: "updated_at", nullable: false })
  updatedAt!: Date

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt!: Date
}
