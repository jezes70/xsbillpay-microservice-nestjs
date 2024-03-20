import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NotificationConsumerService } from './messanging/notification.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const notificationConsumerService = app.get(NotificationConsumerService);
  await notificationConsumerService.consumeMessages();
  await app.listen(3001);
}
bootstrap();
