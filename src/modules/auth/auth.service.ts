import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';

import { LoginAuthDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  create(loginAuthDto: LoginAuthDto) {
    return 'This action adds a new auth';
  }

  async generateCaptcha() {
    // TODO: canvas库不太好安装，后面想别的方案
    const id = nanoid()
    return 'captcha' + id
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
