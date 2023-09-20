import { Injectable } from '@nestjs/common';
// import { nanoid } from 'nanoid';

import { LoginAuthDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from '../user/user.service';

const nanoidObj = async () => await import('nanoid')

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService
  ) { }
  async login(loginAuthDto: LoginAuthDto) {
    const { username, password } = loginAuthDto;
    const user = await this.userService.findByUsername(username)

    if (!user) {
      throw new Error('user not found')
    }

    if (user.password !== password) {
      throw new Error('password is error')
    }

    if (user.deleted) {
      throw new Error('the user is deleted')
    }
    // TODO: 社交绑定（后续补充）
    // 创建token，记录日志
    return user.id;
  }

  async generateCaptcha() {
    // TODO: canvas库不太好安装，后面想别的方案
    // const id = nanoidObj.nanoid()
    return 'captcha'
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
