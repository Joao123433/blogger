import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthTokenGuard } from 'src/auth/guard/auth-token.guard';
import { TokenPayloadParam } from 'src/auth/params/token-payload.param';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { FastifyRequest } from 'fastify';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam } from '@nestjs/swagger';
import { ApiExceptionFilter } from 'src/commom/filters/exception-filter';
import { LoggerInterceptor } from 'src/commom/interceptors/logget.interceptor';

@Controller('users')
@UseInterceptors(LoggerInterceptor)
@UseFilters(ApiExceptionFilter)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: "Find a user" })
  @UseGuards(AuthTokenGuard)
  findOneUser(@TokenPayloadParam() payloadToken: PayloadDto) {
    return this.userService.findOne(payloadToken)
  }

  @Post()
  @ApiOperation({ summary: "Create a user" })
  createUser(@Body() body: CreateUserDto) {
    return this.userService.createOne(body)
  }
  
  @Patch(":id")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update a user" })  
  @ApiParam({
    name: "id",
    example: "vdgm6nrdoxkc01ldbnqzkm0z",
    description: "User identifier"
  })
  @UseGuards(AuthTokenGuard)
  updateUser(@Param("id") id: string, @Body() body: UpdateUserDto, @TokenPayloadParam() payloadToken: PayloadDto) {
    return this.userService.updateOne(id, body, payloadToken)
  }

  @Delete(":id")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete a user" })    
  @ApiParam({
    name: "id",
    example: "vdgm6nrdoxkc01ldbnqzkm0z",
    description: "User identifier"
  })
  @UseGuards(AuthTokenGuard)
  deleteUser(@Param("id") id: string, @TokenPayloadParam() payloadToken: PayloadDto) {
    return this.userService.deleteOne(id, payloadToken)
  }

  @Post("upload")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update avatar" })  
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: 'binary'
        }
      }
    }
  })
  @UseGuards(AuthTokenGuard)
  uploadAvatarFile(@Req() req: FastifyRequest, @TokenPayloadParam() payloadToken: PayloadDto) {
    return this.userService.uploadFile(req, payloadToken)
  }
}
