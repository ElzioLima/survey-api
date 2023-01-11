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
  ManyToOne,
  JoinColumn
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
  user: PgUser;

  @OneToMany((type) => PgQuestion, (question) => question.survey, {
    cascade: true,
    eager: true
  })
  @JoinColumn()
  questions: PgQuestion[];

  @CreateDateColumn({ name: "created_at", nullable: false })
  createdAt!: Date

  @UpdateDateColumn({ name: "updated_at", nullable: false })
  updatedAt!: Date

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt!: Date
}
