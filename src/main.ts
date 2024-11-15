import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Initialize the app

  // Configure Swagger
  const config = new DocumentBuilder()
    .setTitle('Blockchain Price Tracker')
    .setDescription('APIs for tracking prices and alerts')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config); // Generate Swagger document
  SwaggerModule.setup('api', app, document); // Serve Swagger UI at /api

  await app.listen(5001); // Start the application
  console.log('Application is running on: http://localhost:5001');
}

bootstrap();
