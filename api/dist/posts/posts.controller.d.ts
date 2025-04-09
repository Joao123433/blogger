import { PostsService } from './posts.service';
import { PaginationDto } from 'src/commom/dto/Pagination.dto';
import { CreatePostDto } from './dto/create-posts.dto';
import { UpdatePostDto } from './dto/update-post-dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    findAllPosts(pagination: PaginationDto): Promise<{
        id: string;
        title: string;
        introduction: string;
        story: string;
        conclusion: string;
        created_at: Date | null;
        updated_at: Date | null;
        userId: string | null;
    }[]>;
    findPostById(id: string): Promise<{
        id: string;
        title: string;
        introduction: string;
        story: string;
        conclusion: string;
        created_at: Date | null;
        updated_at: Date | null;
        userId: string | null;
    }>;
    CreatePost(body: CreatePostDto): Promise<{
        id: string;
        title: string;
        introduction: string;
        story: string;
        conclusion: string;
        created_at: Date | null;
        updated_at: Date | null;
        userId: string | null;
    }>;
    UpdatePost(id: string, body: UpdatePostDto): Promise<{
        id: string;
        title: string;
        introduction: string;
        story: string;
        conclusion: string;
        created_at: Date | null;
        updated_at: Date | null;
        userId: string | null;
    }>;
    DeletePost(id: string): Promise<{
        message: string;
    }>;
}
