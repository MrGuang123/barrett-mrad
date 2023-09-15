import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../framework/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {

  }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
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
  private async validateUserForCreateOrUpdate(id: number, username: string, email: string, mobile: number) {
    this.validateUserExists(id)
    this.validateUsernameUnique(id, username)
    this.validateEmailUnique(id, email)
    this.validateMobileUnique(id, mobile)
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
  private async validateMobileUnique(id: number, mobile: number) {
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
