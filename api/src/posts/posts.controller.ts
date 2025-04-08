import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PaginationDto } from 'src/commom/dto/Pagination.dto';
import { CreatePostDto } from './dto/create-posts.dto';
import { UpdatePostDto } from './dto/update-post-dto';
import { LoggerInterceptor } from 'src/commom/interceptors/logget.interceptor';

@Controller('posts')
@UseInterceptors(LoggerInterceptor)
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
