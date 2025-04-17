import { PostsService } from './posts.service';
import { PaginationDto } from 'src/commom/dto/Pagination.dto';
import { CreatePostDto } from './dto/create-posts.dto';
import { UpdatePostDto } from './dto/update-post-dto';
import { PayloadDto } from 'src/auth/dto/payload.dto';
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
        userId: string | null;
        Comments: {
            id: string;
            created_at: Date;
            updated_at: Date | null;
            userId: string | null;
            comment: string;
            postId: string | null;
        }[];
    }[]>;
    findPostById(id: string): Promise<{
        id: string;
        title: string;
        introduction: string;
        story: string;
        conclusion: string;
        created_at: Date | null;
        userId: string | null;
        Comments: {
            id: string;
            created_at: Date;
            updated_at: Date | null;
            userId: string | null;
            comment: string;
            postId: string | null;
        }[];
    }>;
    CreatePost(body: CreatePostDto, payloadToken: PayloadDto): Promise<{
        id: string;
        title: string;
        introduction: string;
        story: string;
        conclusion: string;
        created_at: Date | null;
        userId: string | null;
        Comments: {
            id: string;
            created_at: Date;
            updated_at: Date | null;
            userId: string | null;
            comment: string;
            postId: string | null;
        }[];
    }>;
    UpdatePost(id: string, body: UpdatePostDto, payloadToken: PayloadDto): Promise<{
        id: string;
        title: string;
        introduction: string;
        story: string;
        conclusion: string;
        created_at: Date | null;
        updated_at: Date | null;
        userId: string | null;
        Comments: {
            id: string;
            created_at: Date;
            updated_at: Date | null;
            userId: string | null;
            comment: string;
            postId: string | null;
        }[];
    }>;
    DeletePost(id: string, payloadToken: PayloadDto): Promise<{
        message: string;
    }>;
}
