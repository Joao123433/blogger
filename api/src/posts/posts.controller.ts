import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { LoggerInterceptor } from 'src/commom/interceptors/logget.interceptor';
import { ApiExceptionFilter } from 'src/commom/filters/exception-filter';
import { TokenPayloadParam } from 'src/auth/params/token-payload.param';
import { AuthTokenGuard } from 'src/auth/guard/auth-token.guard';
import { PaginationDto } from 'src/commom/dto/Pagination.dto';
import { CreatePostDto } from './dto/create-posts.dto';
import { UpdatePostDto } from './dto/update-post-dto';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { PostsService } from './posts.service';

@Controller('posts')
@UseInterceptors(LoggerInterceptor)
@UseFilters(ApiExceptionFilter)
export class PostsController {
	constructor(private readonly postsService: PostsService) {}

	@Get()
	@ApiOperation({ summary: "Find all posts" })  
	@ApiQuery({ 
    name: "limit",
    required: false,
    example: 10,
    description: "Limit of posts to fetch"
  })
  @ApiQuery({ 
    name: "offset",
    required: false,
    example: 0,
    description: "Number of items to skip"
  })
	findAllPosts(@Query() pagination: PaginationDto) {
		return this.postsService.findAll(pagination);
	}

	@Get(':id')
	@ApiOperation({ summary: "Find a post" })  
  @ApiParam({
		name: "id",
    example: "dtpysooc8k9p2mk6f09rv5ro",
    description: "Post identifier"
  })
	findPostById(@Param('id') id: string) {
		return this.postsService.findById(id);
	}

	@Post()
	@ApiOperation({ summary: "Create a post" })
	@UseGuards(AuthTokenGuard)
	@ApiBearerAuth()
	CreatePost(@Body() body: CreatePostDto, @TokenPayloadParam() payloadToken: PayloadDto) {
		return this.postsService.createOne(body, payloadToken)
	}

	@Patch(":id")
	@ApiOperation({ summary: "Update a post" })
	@UseGuards(AuthTokenGuard)
	@ApiBearerAuth()
	UpdatePost(@Param("id") id: string, @Body() body: UpdatePostDto, @TokenPayloadParam() payloadToken: PayloadDto) {
		return this.postsService.updateOne(id, body, payloadToken)
	}

	@Delete(":id")
	@ApiOperation({ summary: "Delete a post" })
	@UseGuards(AuthTokenGuard)
	@ApiBearerAuth()
	DeletePost(@Param('id') id: string, @TokenPayloadParam() payloadToken: PayloadDto) {
		return this.postsService.deleteOne(id, payloadToken)
	}
}
