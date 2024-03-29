//main.ts
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 3001;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
      .setTitle('TPF Blog cf')
      .setDescription('Documentación de la API')
      .setVersion('0.0.1')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    await app.listen(PORT);
    console.log(`Application is running on: http://localhost:${PORT}`);
    console.log(`Application is running on: ${await app.getUrl()}`);
  } catch (error) {
    console.error('Error starting the application:', error);
  }
}
bootstrap();
