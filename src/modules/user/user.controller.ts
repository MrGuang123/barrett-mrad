import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// https://github.com/MrGuang123/ruoyi-vue-pro/blob/master/yudao-module-system/yudao-module-system-biz/src/main/java/cn/iocoder/yudao/module/system/controller/admin/user/UserController.java
// create update delete update-password update-status page list-all-simple
// get export get-import-template import
@Controller('system/user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('list-all-simple')
  findAll() {
    return this.userService.findAll();
  }

  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
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
