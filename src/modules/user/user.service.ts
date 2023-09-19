import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'

import { PrismaService } from '../../framework/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private saltRounds: number;
  constructor(private prisma: PrismaService) {
    this.saltRounds = 6
  }
  async create(createUserDto: CreateUserDto) {
    const { username, email, mobile } = createUserDto
    // await this.validateUserForCreateOrUpdate(undefined, username, email, mobile)
    // 开启用户状态
    // 密码加密
    // 插入用户
    const salt = bcrypt.genSaltSync(this.saltRounds)
    const password = bcrypt.hashSync(createUserDto.password, salt)
    const userData = {
      ...createUserDto,
      password
    }
    console.log(bcrypt.compareSync('201112', password))
    console.log('createUserDto', userData)
    const user = await this.prisma.systemUser.create({
      data: userData
    })
    // 插入关联岗位
    // 返回用户ID
    return user.id
  }

  findAll() {
    return `This action returns all user`;
  }

  findById(id: number) {
    return `This action returns a #${id} user`;
  }

  findByUsername(username: string) {
    return this.prisma.systemUser.findFirst({
      where: {
        username
      }
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  /**
   * 私有工具方法
   */
  private async validateUserForCreateOrUpdate(id: number | undefined, username: string, email: string, mobile: string) {
    await this.validateUserExists(id)
    await this.validateUsernameUnique(id, username)
    await this.validateEmailUnique(id, email)
    await this.validateMobileUnique(id, mobile)
    // 校验部门开启
    // 校验岗位开启
  }
  private async validateUserExists(id: number) {
    if (!id) {
      return;
    }

    const user = await this.prisma.systemUser.findFirst({
      where: {
        id
      }
    })

    if (!user) {
      throw new Error('user not exists')
    }
  }
  private async validateUsernameUnique(id: number, username: string) {
    if (!username) {
      return
    }

    const user = await this.prisma.systemUser.findFirst({
      where: {
        username
      }
    })

    if (!user) {
      return;
    }

    if (!id) {
      throw new Error('user username exists')
    }

    if (user.id !== id) {
      throw new Error('user username exists')
    }
  }
  private async validateEmailUnique(id: number, email: string) {
    if (!email) {
      return
    }

    const user = await this.prisma.systemUser.findFirst({
      where: {
        email
      }
    })

    if (!user) {
      return;
    }

    if (!id) {
      throw new Error('user email exists')
    }

    if (user.id !== id) {
      throw new Error('user email exists')
    }
  }
  private async validateMobileUnique(id: number, mobile: string) {
    if (!mobile) {
      return
    }

    const user = await this.prisma.systemUser.findFirst({
      where: {
        mobile
      }
    })

    if (!user) {
      return;
    }

    if (!id) {
      throw new Error('user mobile exists')
    }

    if (user.id !== id) {
      throw new Error('user mobile exists')
    }
  }

}
