import { Controller, Get, Post, Body, Patch, Param, Delete, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// https://github.com/MrGuang123/ruoyi-vue-pro/blob/master/yudao-module-system/yudao-module-system-biz/src/main/java/cn/iocoder/yudao/module/system/controller/admin/user/UserController.java
// create update delete update-password update-status page list-all-simple
// get export get-import-template import
@Controller({
  path: 'system/user',
  // version: ['2']
})
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('create')
  @Version([VERSION_NEUTRAL, '1'])
  async create(@Body() createUserDto: CreateUserDto) {
    console.log('dto', createUserDto)
    // 如果多租户，需要校验租户额度，后续根据需要补充

    // 参数合法性校验，大部分通过DTO已经校验，后续根据需要补充

    // 业务检验

    // return 'create user'
    return this.userService.create(createUserDto);
  }

  @Get('list-all-simple')
  findAll() {
    return this.userService.findAll();
  }

  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

}
