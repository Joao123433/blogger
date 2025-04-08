import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get(":id")
  findOneUser(@Param("id") id: string) {
    return this.userService.findOne(id)
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.userService.createOne(body)
  }

  @Patch(":id")
  updateUser(@Param("id") id: string, @Body() body: UpdateUserDto) {
    return this.userService.updateOne(id, body)
  }

  @Delete(":id")
  deleteUser(@Param("id") id: string) {
    return this.userService.deleteOne(id)
  }
}
