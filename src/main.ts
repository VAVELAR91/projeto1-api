import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200', // URL do seu app Angular
  });

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Autenticação')
    .setDescription('API para autenticação com NestJS e PostgreSQL')
    .setVersion('1.0')
    .addBearerAuth() // Para suporte ao JWT no Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Inicializar o aplicativo
  await app.listen(3000);
}
bootstrap();
