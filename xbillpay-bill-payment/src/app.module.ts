import {  Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ormconfig } from './config/ormconfig';
import { BillModule } from './bill.module';

@Module({
  imports: [BillModule,
    TypeOrmModule.forRoot(ormconfig)],
  controllers: [],
  providers: [],
})
export class AppModule {
  }
