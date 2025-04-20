import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashingServiceProtocol } from 'src/auth/hash/hashing.service';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { FastifyRequest } from 'fastify';
import { MultipartFile } from '@fastify/multipart';
export declare class UsersService {
    private prisma;
    private hashingService;
    constructor(prisma: PrismaService, hashingService: HashingServiceProtocol);
    findOne(payloadToken: PayloadDto): Promise<{
        id: string;
        name: string;
        email: string;
        avatar: string | null;
        created_at: Date;
        updated_at: Date | null;
        Posts: {
            id: string;
            created_at: Date | null;
            title: string;
            introduction: string;
        }[];
        Comments: {
            id: string;
            created_at: Date;
            comment: string;
        }[];
    }>;
    createOne(body: CreateUserDto): Promise<{
        id: string;
        name: string;
        email: string;
        created_at: Date;
        updated_at: Date | null;
    }>;
    updateOne(id: string, body: UpdateUserDto, payloadToken: PayloadDto): Promise<{
        id: string;
        name: string;
        email: string;
    }>;
    deleteOne(id: string, payloadToken: PayloadDto): Promise<{
        message: string;
    }>;
    uploadFile(req: FastifyRequest, payloadToken: PayloadDto): Promise<{
        id: string;
        name: string;
        email: string;
        avatar: string | null;
    }>;
    validateBuffer(file: MultipartFile): Promise<Buffer<ArrayBuffer>>;
}
