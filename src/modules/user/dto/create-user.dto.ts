import { IsInt, IsNotEmpty, IsEmail, IsPhoneNumber, MinLength, MaxLength } from 'class-validator'

// class-validator 包提供了基于装饰器声明的规则对对象做校验的功能
// class-transformer 则是把一个普通对象转换为某个 class 的实例对象的
export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3, {
    message: 'username is too short, Minimal length is $constraint1 characters, but actual is $value'
  })
  @MaxLength(10, {
    message: 'username is too long, Maximal length is $constraint1 characters, but actual is $value'
  })
  username: string;

  @IsNotEmpty()
  @MinLength(6, {
    message: 'password is too short, Minimal length is $constraint1 characters, but actual is $value'
  })
  password: string;

  @IsNotEmpty()
  nickname: string;

  remark: string;

  @IsNotEmpty()
  dept_id: string;

  @IsNotEmpty()
  post_ids: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  mobile: string;

  @IsInt()
  sex: number;

  avatar: string;

  tenant_id: string;
}
