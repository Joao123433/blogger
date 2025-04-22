import { Body, Controller, Delete, Get, Param, Patch, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsService } from './comments.service';
import { TokenPayloadParam } from 'src/auth/params/token-payload.param';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { AuthTokenGuard } from 'src/auth/guard/auth-token.guard';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiExceptionFilter } from 'src/commom/filters/exception-filter';
import { LoggerInterceptor } from 'src/commom/interceptors/logget.interceptor';

@Controller('comments')
@UseInterceptors(LoggerInterceptor)
@UseFilters(ApiExceptionFilter)
export class CommentsController {
  constructor(private commentService: CommentsService) {}

  @Get(":id")
  findByPostId(@Param("id") postId: string) {
    return this.commentService.findComments(postId)
  }

  @UseGuards(AuthTokenGuard)
  @ApiBearerAuth()
  @Post()
  createCommet(@Body() body: CreateCommentDto, @TokenPayloadParam() payloadToken: PayloadDto) {
    return this.commentService.createOne(body, payloadToken)
  }

  @UseGuards(AuthTokenGuard)
  @ApiBearerAuth()
  @Patch(':id')
  updateComment(@Param("id") id: string, @Body() body: UpdateCommentDto, @TokenPayloadParam() payloadToken: PayloadDto) {
    return this.commentService.updateOne(id, body, payloadToken)
  }

  @UseGuards(AuthTokenGuard)
  @ApiBearerAuth()
  @Delete(':id')
  deleteComment(@Param("id") id: string, @TokenPayloadParam() payloadToken: PayloadDto) {
    return this.commentService.deleteOne(id, payloadToken)
  }
}
