import { NestFactory } from '@nestjs/core';
import { VERSION_NEUTRAL, VersioningType, ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 开启数据传输对象验证
  app.useGlobalPipes(new ValidationPipe({
    // 如果设置true，验证器将剔除验证对象里面所有没有装饰器的属性
    // 提示: 如果你的属性没有适合的装饰器请使用 @Allow 装饰器.
    whitelist: true
  }))

  // 添加全局路由前缀
  app.setGlobalPrefix('/api')
  app.enableVersioning({
    defaultVersion: [VERSION_NEUTRAL, '1'],
    type: VersioningType.URI,
  });

  await app.listen(3000);
}
bootstrap();
