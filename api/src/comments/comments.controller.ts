import { Body, Controller, Delete, Get, Param, Patch, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { LoggerInterceptor } from 'src/commom/interceptors/logget.interceptor';
import { ApiExceptionFilter } from 'src/commom/filters/exception-filter';
import { TokenPayloadParam } from 'src/auth/params/token-payload.param';
import { ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';
import { AuthTokenGuard } from 'src/auth/guard/auth-token.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { CommentsService } from './comments.service';

@Controller('comments')
@UseInterceptors(LoggerInterceptor)
@UseFilters(ApiExceptionFilter)
export class CommentsController {
  constructor(private commentService: CommentsService) {}

  @Get(":id")
  @ApiOperation({ summary: "Find a comment" })
  @ApiParam({
    name: "postId",
    example: "dtpysooc8k9p2mk6f09rv5ro",
    description: "Comment identifier"
  })
  findByPostId(@Param("postId") postId: string) {
    return this.commentService.findComments(postId)
  }

  @Post()
	@ApiOperation({ summary: "Create a comment" })
  @UseGuards(AuthTokenGuard)
  @ApiBearerAuth()
  createCommet(@Body() body: CreateCommentDto, @TokenPayloadParam() payloadToken: PayloadDto) {
    return this.commentService.createOne(body, payloadToken)
  }

  @Patch(':id')
	@ApiOperation({ summary: "Update a comment" })
  @ApiParam({
    name: "id",
    example: "incepqkkr8s0w6n6gm4pnnlb",
    description: "Comment identifier"
  })
  @UseGuards(AuthTokenGuard)
  @ApiBearerAuth()
  updateComment(@Param("id") id: string, @Body() body: UpdateCommentDto, @TokenPayloadParam() payloadToken: PayloadDto) {
    return this.commentService.updateOne(id, body, payloadToken)
  }

  @Delete(':id')
	@ApiOperation({ summary: "Delete a comment" })
  @ApiParam({
    name: "id",
    example: "incepqkkr8s0w6n6gm4pnnlb",
    description: "Comment identifier"
  })
  @UseGuards(AuthTokenGuard)
  @ApiBearerAuth()
  deleteComment(@Param("id") id: string, @TokenPayloadParam() payloadToken: PayloadDto) {
    return this.commentService.deleteOne(id, payloadToken)
  }
}
