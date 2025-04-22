import { PostsService } from './posts.service';
import { PaginationDto } from 'src/commom/dto/Pagination.dto';
import { CreatePostDto } from './dto/create-posts.dto';
import { UpdatePostDto } from './dto/update-post-dto';
import { PayloadDto } from 'src/auth/dto/payload.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    findAllPosts(pagination: PaginationDto): Promise<import("./dto/response.dto").ResponseFindPostDto[]>;
    findPostById(id: string): Promise<import("./dto/response.dto").ResponseFindPostDto>;
    CreatePost(body: CreatePostDto, payloadToken: PayloadDto): Promise<import("./dto/response.dto").ResponseCreatePostDto>;
    UpdatePost(id: string, body: UpdatePostDto, payloadToken: PayloadDto): Promise<import("./dto/response.dto").ResponseCreatePostDto>;
    DeletePost(id: string, payloadToken: PayloadDto): Promise<{
        message: string;
    }>;
}
