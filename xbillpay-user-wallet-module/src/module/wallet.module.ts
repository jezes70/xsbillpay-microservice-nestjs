import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletAccount } from '../domain/entities/user.wallet.account';
import { WalletController } from '..//web/controllers/wallet.controller';
import { WalletService } from '../web/services/wallet.service';
import { WalletRepository } from '../domain/repository/wallet.repository';
import { WalletAuthMiddleware } from '../middlewares/wallet.middlewares';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([WalletAccount])],
  controllers: [WalletController],
  providers: [WalletService,WalletRepository,JwtService],
})
export class WalletModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(WalletAuthMiddleware)
        .forRoutes('api/v3/check-balance','api/v3/add-fund');
    }
  }