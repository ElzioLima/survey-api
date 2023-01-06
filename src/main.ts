import { PgConnection } from '@/infra/repos/postgres/helpers';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  PgConnection.getInstance().connect().then(async () => {
    console.log('Connected to database');
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
  });
}
bootstrap();
