import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormconfig } from './config/ormconfig';
import { AuthModule } from './web/modules/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig),
  AuthModule
  ],
    controllers: [],
    providers: [],
  })

export class AppModule {}
