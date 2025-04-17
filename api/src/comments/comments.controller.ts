import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsService } from './comments.service';
import { TokenPayloadParam } from 'src/auth/params/token-payload.param';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { AuthTokenGuard } from 'src/auth/guard/auth-token.guard';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentService: CommentsService) {}

  @UseGuards(AuthTokenGuard)
  @Post()
  createCommet(@Body() body: CreateCommentDto, @TokenPayloadParam() payloadToken: PayloadDto) {
    return this.commentService.createOne(body, payloadToken)
  }

  @UseGuards(AuthTokenGuard)
  @Patch(':id')
  updateComment(@Param("id") id: string, @Body() body: UpdateCommentDto, @TokenPayloadParam() payloadToken: PayloadDto) {
    return this.commentService.updateOne(id, body, payloadToken)
  }

  @UseGuards(AuthTokenGuard)
  @Delete(':id')
  deleteComment(@Param("id") id: string, @TokenPayloadParam() payloadToken: PayloadDto) {
    return this.commentService.deleteOne(id, payloadToken)
  }
}
