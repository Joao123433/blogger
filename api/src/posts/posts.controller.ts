import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PaginationDto } from 'src/commom/dto/Pagination.dto';
import { CreatePostDto } from './dto/create-posts.dto';
import { UpdatePostDto } from './dto/update-post-dto';
import { LoggerInterceptor } from 'src/commom/interceptors/logget.interceptor';
import { ApiExceptionFilter } from 'src/commom/filters/exception-filter';
import { AuthTokenGuard } from 'src/auth/guard/auth-token.guard';
import { TokenPayloadParam } from 'src/auth/params/token-payload.param';
import { PayloadDto } from 'src/auth/dto/payload.dto';

@Controller('posts')
@UseInterceptors(LoggerInterceptor)
@UseFilters(ApiExceptionFilter)
export class PostsController {
	constructor(private readonly postsService: PostsService) {}

	@Get()
	findAllPosts(@Query() pagination: PaginationDto) {
		return this.postsService.findAll(pagination);
	}

	@Get(':id')
	findPostById(@Param('id') id: string) {
		return this.postsService.findById(id);
	}

	@UseGuards(AuthTokenGuard)
	@Post()
	CreatePost(@Body() body: CreatePostDto, @TokenPayloadParam() payloadToken: PayloadDto) {
		return this.postsService.createOne(body, payloadToken)
	}

	@UseGuards(AuthTokenGuard)
	@Patch(":id")
	UpdatePost(@Param("id") id: string, @Body() body: UpdatePostDto, @TokenPayloadParam() payloadToken: PayloadDto) {
		return this.postsService.updateOne(id, body, payloadToken)
	}

	@UseGuards(AuthTokenGuard)
	@Delete(":id")
	DeletePost(@Param('id') id: string, @TokenPayloadParam() payloadToken: PayloadDto) {
		return this.postsService.deleteOne(id, payloadToken)
	}
}
