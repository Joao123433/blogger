import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PaginationDto } from 'src/commom/dto/Pagination.dto';
import { CreatePostDto } from './dto/create-posts.dto';
import { UpdatePostDto } from './dto/update-post-dto';
import { LoggerInterceptor } from 'src/commom/interceptors/logget.interceptor';
import { ApiExceptionFilter } from 'src/commom/filters/exception-filter';
import { AuthGuard } from 'src/commom/guards/admin.guard';

@Controller('posts')
@UseInterceptors(LoggerInterceptor)
@UseFilters(ApiExceptionFilter)
@UseGuards(AuthGuard)
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
