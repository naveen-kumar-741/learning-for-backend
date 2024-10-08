import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const appPort = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  console.log(`Server is running on port `, appPort);
  await app.listen(appPort);
}
bootstrap();
