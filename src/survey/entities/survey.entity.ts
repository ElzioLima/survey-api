import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    DeleteDateColumn, 
    CreateDateColumn, 
    UpdateDateColumn, 
    OneToMany,
    ManyToOne,
    JoinColumn
  } from 'typeorm'
  import { Question } from '@/survey/entities/question.entity'
  import { User } from '@/users/entities/user.entity'
  
  @Entity({ name: 'surveys' })
  export class Survey {
    @PrimaryGeneratedColumn('uuid')
    id!: string
  
    @Column()
    name!: string
  
    @Column()
    description!: string
  
    @ManyToOne((type) => User, (user) => user.surveys)
    user: User;
  
    @OneToMany((type) => Question, (question) => question.survey, {
      cascade: ["insert"],
      eager: true
    })
    @JoinColumn()
    questions: Question[];
  
    @CreateDateColumn({ name: "created_at", nullable: false })
    createdAt!: Date
  
    @UpdateDateColumn({ name: "updated_at", nullable: false })
    updatedAt!: Date
  
    @DeleteDateColumn({ name: "deleted_at", nullable: true })
    deletedAt!: Date
  }
  