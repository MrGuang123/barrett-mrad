import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

const enabledCaptcha = true

@Controller('system/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  login(@Body() loginDto: LoginAuthDto) {
    return this.authService.create(loginDto);
  }

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
