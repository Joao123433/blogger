import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PaginationDto } from 'src/commom/dto/Pagination.dto';
import { CreatePostDto } from './dto/create-posts.dto';
import { UpdatePostDto } from './dto/update-post-dto';
import { LoggerInterceptor } from 'src/commom/interceptors/logget.interceptor';
import { ApiExceptionFilter } from 'src/commom/filters/exception-filter';
import { AuthTokenGuard } from 'src/auth/guard/auth-token.guard';
import { FastifyRequest } from 'fastify';
import { AUTH_TOKEN_PAYLOAD } from 'src/auth/commom/auth.constants';

@Controller('posts')
@UseInterceptors(LoggerInterceptor)
@UseFilters(ApiExceptionFilter)
export class PostsController {
	constructor(private readonly postsService: PostsService) {}

	@UseGuards(AuthTokenGuard)
	@Get()
	findAllPosts(@Query() pagination: PaginationDto, @Req() req: FastifyRequest) {
		console.log(req[AUTH_TOKEN_PAYLOAD])

		return this.postsService.findAll(pagination);
	}

	@Get(':id')
	findPostById(@Param('id') id: string) {
		return this.postsService.findById(id);
	}

	@Post()
	CreatePost(@Body() body: CreatePostDto) {
		return this.postsService.createOne(body)
	}

	@Patch(":id")
	UpdatePost(@Param("id") id: string, @Body() body: UpdatePostDto) {
		return this.postsService.updateOne(id, body)
	}

	@Delete(":id")
	DeletePost(@Param('id') id: string) {
		return this.postsService.deleteOne(id)
	}
}
