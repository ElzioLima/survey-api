import { PgConnection } from '@/infra/repos/postgres/helpers';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  PgConnection.getInstance().connect().then(async () => {
    console.log('Connected to database');
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
      .setTitle('Cats example')
      .setDescription('The cats API description')
      .setVersion('1.0')
      .addTag('cats')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
  });
}
bootstrap();
