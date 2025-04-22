import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashingServiceProtocol } from 'src/auth/hash/hashing.service';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { FastifyRequest } from 'fastify';
import { MultipartFile } from '@fastify/multipart';
import { ResponseCreateUserDto, ResponseFindUserDto, ResponseUpdateAvatarDto, ResponseUpdateUserDto } from './dto/response.dto';
export declare class UsersService {
    private prisma;
    private hashingService;
    constructor(prisma: PrismaService, hashingService: HashingServiceProtocol);
    findOne(payloadToken: PayloadDto): Promise<ResponseFindUserDto>;
    createOne(body: CreateUserDto): Promise<ResponseCreateUserDto>;
    updateOne(id: string, body: UpdateUserDto, payloadToken: PayloadDto): Promise<ResponseUpdateUserDto>;
    deleteOne(id: string, payloadToken: PayloadDto): Promise<{
        message: string;
    }>;
    uploadFile(req: FastifyRequest, payloadToken: PayloadDto): Promise<ResponseUpdateAvatarDto>;
    validateBuffer(file: MultipartFile): Promise<Buffer<ArrayBuffer>>;
}
