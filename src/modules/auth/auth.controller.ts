import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

const enabledCaptcha = true

@Controller('system/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // 账号密码登录
  @Post('login')
  login(@Body() loginDto: LoginAuthDto) {
    // 后续添加验证码和uuid
    if (enabledCaptcha) {

    }
    // 后续添加第三方登录功能

    // 调用login的service
    return this.authService.login(loginDto);
  }

  // 手机验证码登录
  @Post('sms-login')
  smsLogin(@Body() loginDto: LoginAuthDto) {
    // 校验验证码，（是否存在、是否超时、是否被使用）
    // 基于手机号查询校验用户
    // 创建token令牌、记录日志

    // 调用login的service
    return this.authService.login(loginDto);
  }

  // 获取验证码
  // TODO: 添加一个无需登录的装饰器
  @Get('get-captcha')
  getCaptchaImage() {
    if (!enabledCaptcha) {
      return {
        enable: enabledCaptcha,
        uuid: null,
        image: ''
      }
    }
    return this.authService.generateCaptcha();
  }

  // 发送手机验证码
  @Post('send-sms-code')
  sendSmsCode() {
    // 验证用户是否存在
    // 创建短信验证码，场景和短信可以创建一个枚举，不同场景使用的模板是不一样的
    // 限制频率，（每天的总量、发送的频率、每个IP每天的量、每个IP每个小时的量）
    // 发送短信
    // 将生成的验证码存储到数据库，方便限制频率，如果使用Redis实现该需求比较麻烦
    console.log('send sms code')
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
