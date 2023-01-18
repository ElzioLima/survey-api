import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    DeleteDateColumn, 
    CreateDateColumn, 
    UpdateDateColumn, 
    ManyToOne
  } from 'typeorm'
  import { Question } from '../../survey/entities/question.entity'
  import { User } from '../../users/entities/user.entity'
  
  @Entity({ name: 'answers' })
  export class Answer {
    @PrimaryGeneratedColumn('uuid')
    id!: string
  
    @Column()
    description!: string
  
    @ManyToOne((type) => Question, (question) => question.answers, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      orphanedRowAction: "delete",
      nullable: false
    })
    question: Question;
  
    @ManyToOne((type) => User, (user) => user.answers, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      orphanedRowAction: "delete",
      nullable: false
    })
    user: User;
  
    @CreateDateColumn({ name: "created_at", nullable: false })
    createdAt!: Date
  
    @UpdateDateColumn({ name: "updated_at", nullable: false })
    updatedAt!: Date
  
    @DeleteDateColumn({ name: "deleted_at", nullable: true })
    deletedAt!: Date
  }
  