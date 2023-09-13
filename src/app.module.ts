import { Module } from '@nestjs/common';
import { PrismaModule } from './framework/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
})
export class AppModule { }
