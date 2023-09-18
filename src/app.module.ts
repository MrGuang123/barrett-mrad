import { Module } from '@nestjs/common';
import { PrismaModule } from './framework/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { TestModule } from './modules/test/test.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UserModule,
    TestModule,
    AuthModule
  ],
})
export class AppModule { }
