import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthTokenGuard } from 'src/auth/guard/auth-token.guard';
import { TokenPayloadParam } from 'src/auth/params/token-payload.param';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { FastifyRequest } from 'fastify';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiExceptionFilter } from 'src/commom/filters/exception-filter';
import { LoggerInterceptor } from 'src/commom/interceptors/logget.interceptor';

@Controller('users')
@UseInterceptors(LoggerInterceptor)
@UseFilters(ApiExceptionFilter)
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
  @ApiBearerAuth()
  @Patch(":id")
  updateUser(@Param("id") id: string, @Body() body: UpdateUserDto, @TokenPayloadParam() payloadToken: PayloadDto) {
    return this.userService.updateOne(id, body, payloadToken)
  }

  @UseGuards(AuthTokenGuard)
  @ApiBearerAuth()
  @Delete(":id")
  deleteUser(@Param("id") id: string, @TokenPayloadParam() payloadToken: PayloadDto) {
    return this.userService.deleteOne(id, payloadToken)
  }

  @UseGuards(AuthTokenGuard)
  @ApiBearerAuth()
  @Post("upload")
  uploadAvatarFile(@Req() req: FastifyRequest, @TokenPayloadParam() payloadToken: PayloadDto) {
    return this.userService.uploadFile(req, payloadToken)
  }
}
