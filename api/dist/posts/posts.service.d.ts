import { ResponseCreatePostDto, ResponseOtherDto } from './dto/response.dto';
import { PaginationDto } from 'src/commom/dto/Pagination.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-posts.dto';
import { UpdatePostDto } from './dto/update-post-dto';
import { PayloadDto } from 'src/auth/dto/payload.dto';
export declare class PostsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(pagination: PaginationDto): Promise<ResponseOtherDto[]>;
    findById(id: string): Promise<ResponseOtherDto>;
    createOne(body: CreatePostDto, payloadToken: PayloadDto): Promise<ResponseCreatePostDto>;
    updateOne(id: string, body: UpdatePostDto, payloadToken: PayloadDto): Promise<ResponseOtherDto>;
    deleteOne(id: string, payloadToken: PayloadDto): Promise<{
        message: string;
    }>;
}
