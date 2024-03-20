import { Module } from '@nestjs/common';
import { NotificationConsumerService } from './messanging/notification.service';


@Module({
  imports: [],
  controllers: [],
  providers: [NotificationConsumerService],
})
export class AppModule {}
