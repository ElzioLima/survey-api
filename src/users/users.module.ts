import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { PgUserRepository } from '@/infra/repos/postgres';
import { 
  CreateUser,
  UpdateUser,
  ListUser,
  ListOneUser,
  DeleteUser
} from '@/data/use-cases/user';
import { BcryptAdapter, JwtTokenHandler } from '@/infra/gateways';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: PgUserRepository,
      useClass: PgUserRepository
    },
    {
      provide: BcryptAdapter,
      useFactory: () => new BcryptAdapter(Number(process.env.BCRYPT_SALT_ROUNDS))
    },
    {
      provide: JwtTokenHandler,
      useFactory: () => new JwtTokenHandler(process.env.JWT_SECRET)
    },
    {
      provide: CreateUser,
      useFactory: (
        userRepo: PgUserRepository,
        hasher: BcryptAdapter,
        tokenGenerator: JwtTokenHandler
      ) => new CreateUser(userRepo, tokenGenerator, hasher),
      inject: [PgUserRepository, BcryptAdapter, JwtTokenHandler]
    },
    {
      provide: UpdateUser,
      useFactory: (
        userRepo: PgUserRepository
      ) => new UpdateUser(userRepo),
      inject: [PgUserRepository]
    },
    {
      provide: ListUser,
      useFactory: (
        userRepo: PgUserRepository
      ) => new ListUser(userRepo),
      inject: [PgUserRepository]
    },
    {
      provide: ListOneUser,
      useFactory: (
        userRepo: PgUserRepository
      ) => new ListOneUser(userRepo),
      inject: [PgUserRepository]
    },
    {
      provide: DeleteUser,
      useFactory: (
        userRepo: PgUserRepository
      ) => new DeleteUser(userRepo),
      inject: [PgUserRepository]
    }
  ]
})
export class UsersModule {}
