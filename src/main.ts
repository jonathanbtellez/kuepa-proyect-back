import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { envs } from './config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('Main')
  const app = await NestFactory.create(AppModule, {
    cors: true
  });

    

  app.setGlobalPrefix('api/v1')
  const config = new DocumentBuilder()
  .setTitle('Kuepa test back-end')
  .setDescription('Handle the petitions of kuepa test front end')
  .setVersion('1.0')
  .addTag('auth')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(envs.port);
  logger.log(`Kuepa test project listening on port ${envs.port}`);
}
bootstrap();