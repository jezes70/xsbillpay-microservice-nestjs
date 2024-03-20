import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from '../controllers/user.controllers';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import * as dotenv from 'dotenv';
import { JWTStartegy } from '../../strategy/jwt.strategy';
import { UserMiddleWare } from '../../middlewares/user.middleware';
import { UserRepository } from '../../domain/repositories/enity.repository';
import { OTPRepository } from '../../domain/repositories/otp.repository';
import { RabbitMQService } from '../messanging/rabbitmq.message';
import { XBILLUserAgent } from '../../domain/entities/user.entity';
import { XBILLUserOTP } from '../../domain/entities/user.otp';
import { PaystackService } from '../services/account.service';

dotenv.config();
const secret = process.env.JWT_SECRET as string;

@Module({
  imports: [
    TypeOrmModule.forFeature([XBILLUserAgent,XBILLUserOTP]),
    JwtModule.register({
      global: true,
      secret: secret,
      signOptions: { 
        expiresIn: '1h',
      },
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    AuthService,
    JWTStartegy,
    UserRepository,
    OTPRepository, 
    RabbitMQService,
    PaystackService
  ],
})

export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleWare).forRoutes("api/v1/login","api/v1/agent");
  }
}
