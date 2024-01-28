import { UserService } from './user.service';
import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('addUser')
  createUser(@Body() dto: UserDto) {
    return this.userService.createUser(dto);
  }
}
