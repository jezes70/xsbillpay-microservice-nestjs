import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { WalletConsumerService } from './messanging/consume/wallet.rabbibmq';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3003);
}
bootstrap();
