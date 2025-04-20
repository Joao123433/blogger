import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/commom/dto/Pagination.dto';
import { CreatePostDto } from './dto/create-posts.dto';
import { UpdatePostDto } from './dto/update-post-dto';
import { PayloadDto } from 'src/auth/dto/payload.dto';
export declare class PostsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(pagination: PaginationDto): Promise<{
        id: string;
        title: string;
        introduction: string;
        story: string;
        conclusion: string;
        created_at: Date | null;
        Comments: {
            user: {
                created_at: Date;
                name: string;
                email: string;
            } | null;
            comment: string;
        }[];
        user: {
            id: string;
            created_at: Date;
            name: string;
            email: string;
        } | null;
    }[]>;
    findById(id: string): Promise<{
        id: string;
        title: string;
        introduction: string;
        story: string;
        conclusion: string;
        created_at: Date | null;
        Comments: {
            user: {
                created_at: Date;
                name: string;
                email: string;
            } | null;
            comment: string;
        }[];
        user: {
            id: string;
            created_at: Date;
            name: string;
            email: string;
        } | null;
    }>;
    createOne(body: CreatePostDto, payloadToken: PayloadDto): Promise<{
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
    updateOne(id: string, body: UpdatePostDto, payloadToken: PayloadDto): Promise<{
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
    deleteOne(id: string, payloadToken: PayloadDto): Promise<{
        message: string;
    }>;
}
