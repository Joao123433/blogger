import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthTokenGuard } from 'src/auth/guard/auth-token.guard';
import { TokenPayloadParam } from 'src/auth/params/token-payload.param';
import { PayloadDto } from 'src/auth/dto/payload.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AuthTokenGuard)
  @Get()
  findOneUser(@TokenPayloadParam() payloadToken: PayloadDto) {
    return this.userService.findOne(payloadToken)
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.userService.createOne(body)
  }
  
  @UseGuards(AuthTokenGuard)
  @Patch(":id")
  updateUser(@Param("id") id: string, @Body() body: UpdateUserDto, @TokenPayloadParam() payloadToken: PayloadDto) {
    return this.userService.updateOne(id, body, payloadToken)
  }

  @UseGuards(AuthTokenGuard)
  @Delete(":id")
  deleteUser(@Param("id") id: string, @TokenPayloadParam() payloadToken: PayloadDto) {
    return this.userService.deleteOne(id, payloadToken)
  }
}
