import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = 3001

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    await app.listen(PORT);
    console.log(`http://localhost:${PORT}`);
  } catch (error) {
    console.error('Error starting the application:', error);
  }
}
bootstrap();
