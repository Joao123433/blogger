import { PostsService } from './posts.service';
import { PaginationDto } from 'src/commom/dto/Pagination.dto';
import { CreatePostDto } from './dto/create-posts.dto';
import { UpdatePostDto } from './dto/update-post-dto';
import { PayloadDto } from 'src/auth/dto/payload.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    findAllPosts(pagination: PaginationDto): Promise<{
        title: string;
        introduction: string;
        story: string;
        conclusion: string;
        id: string;
        created_at: Date | null;
        userId: string | null;
        Comments: {
            id: string;
            created_at: Date;
            updated_at: Date | null;
            userId: string | null;
            postId: string | null;
            comment: string;
        }[];
    }[]>;
    findPostById(id: string): Promise<{
        title: string;
        introduction: string;
        story: string;
        conclusion: string;
        id: string;
        created_at: Date | null;
        userId: string | null;
        Comments: {
            id: string;
            created_at: Date;
            updated_at: Date | null;
            userId: string | null;
            postId: string | null;
            comment: string;
        }[];
    }>;
    CreatePost(body: CreatePostDto, payloadToken: PayloadDto): Promise<{
        title: string;
        introduction: string;
        story: string;
        conclusion: string;
        id: string;
        created_at: Date | null;
        userId: string | null;
        Comments: {
            id: string;
            created_at: Date;
            updated_at: Date | null;
            userId: string | null;
            postId: string | null;
            comment: string;
        }[];
    }>;
    UpdatePost(id: string, body: UpdatePostDto, payloadToken: PayloadDto): Promise<{
        title: string;
        introduction: string;
        story: string;
        conclusion: string;
        id: string;
        created_at: Date | null;
        updated_at: Date | null;
        userId: string | null;
        Comments: {
            id: string;
            created_at: Date;
            updated_at: Date | null;
            userId: string | null;
            postId: string | null;
            comment: string;
        }[];
    }>;
    DeletePost(id: string, payloadToken: PayloadDto): Promise<{
        message: string;
    }>;
}
