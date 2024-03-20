import { Module } from '@nestjs/common';
import { WalletModule } from './module/wallet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormconfig } from './orm/ormconfig';

@Module({
  imports: [WalletModule,TypeOrmModule.forRoot(ormconfig)],
  controllers: [],
  providers: [],
})
export class AppModule {}
