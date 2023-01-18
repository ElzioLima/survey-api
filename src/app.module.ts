import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AnswersModule } from './answers/answers.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { DataSource } from 'typeorm';
import { Survey } from './survey/entities/survey.entity';
import { Question } from './survey/entities/question.entity';
import { SurveyModule } from './survey/survey.module';
import { Answer } from './answers/entities/answer.entity';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true
      }
    ),
    TypeOrmModule.forRoot(
      {
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        logging: process.env.NODE_ENV === 'development',
        synchronize: process.env.NODE_ENV === 'development',
        cache: {
          type: 'database',
          duration: 1000 * 60,
          options: {
            database: 'postgres',
            schema: 'public',
            table: 'cache'
          }
        },
        entities: [User, Survey, Question, Answer],
        autoLoadEntities: true
      }
    ),
    UsersModule,
    SurveyModule,
    AnswersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  constructor(private dataSource: DataSource) {}
}
