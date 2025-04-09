import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/commom/dto/Pagination.dto';
import { CreatePostDto } from './dto/create-posts.dto';
import { UpdatePostDto } from './dto/update-post-dto';
export declare class PostsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(pagination: PaginationDto): Promise<{
        title: string;
        introduction: string;
        story: string;
        conclusion: string;
        id: string;
        created_at: Date | null;
        updated_at: Date | null;
        userId: string | null;
    }[]>;
    findById(id: string): Promise<{
        title: string;
        introduction: string;
        story: string;
        conclusion: string;
        id: string;
        created_at: Date | null;
        updated_at: Date | null;
        userId: string | null;
    }>;
    createOne(body: CreatePostDto): Promise<{
        title: string;
        introduction: string;
        story: string;
        conclusion: string;
        id: string;
        created_at: Date | null;
        updated_at: Date | null;
        userId: string | null;
    }>;
    updateOne(id: string, body: UpdatePostDto): Promise<{
        title: string;
        introduction: string;
        story: string;
        conclusion: string;
        id: string;
        created_at: Date | null;
        updated_at: Date | null;
        userId: string | null;
    }>;
    deleteOne(id: string): Promise<{
        message: string;
    }>;
}
