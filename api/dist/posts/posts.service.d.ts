import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/commom/dto/Pagination.dto';
import { CreatePostDto } from './dto/create-posts.dto';
import { UpdatePostDto } from './dto/update-post-dto';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { ResponseCreatePostDto, ResponseFindPostDto } from './dto/response.dto';
export declare class PostsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(pagination: PaginationDto): Promise<ResponseFindPostDto[]>;
    findById(id: string): Promise<ResponseFindPostDto>;
    createOne(body: CreatePostDto, payloadToken: PayloadDto): Promise<ResponseCreatePostDto>;
    updateOne(id: string, body: UpdatePostDto, payloadToken: PayloadDto): Promise<ResponseCreatePostDto>;
    deleteOne(id: string, payloadToken: PayloadDto): Promise<{
        message: string;
    }>;
}
