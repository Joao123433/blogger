import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashingServiceProtocol } from 'src/auth/hash/hashing.service';
import { PayloadDto } from 'src/auth/dto/payload.dto';
export declare class UsersService {
    private prisma;
    private hashingService;
    constructor(prisma: PrismaService, hashingService: HashingServiceProtocol);
    findOne(id: string): Promise<{
        id: string;
        name: string;
        email: string;
        created_at: Date;
        Posts: {
            id: string;
            created_at: Date | null;
            updated_at: Date | null;
            title: string;
            introduction: string;
            story: string;
            conclusion: string;
            userId: string | null;
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
}
