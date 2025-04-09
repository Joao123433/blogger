import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findOne(id: string): Promise<{
        id: string;
        created_at: Date;
        name: string;
        Posts: {
            title: string;
            introduction: string;
            story: string;
            conclusion: string;
            id: string;
            created_at: Date | null;
            updated_at: Date | null;
            userId: string | null;
        }[];
        email: string;
    }>;
    createOne(body: CreateUserDto): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date | null;
        name: string;
        email: string;
    }>;
    updateOne(id: string, body: UpdateUserDto): Promise<{
        id: string;
        name: string;
        email: string;
    }>;
    deleteOne(id: string): Promise<{
        message: string;
    }>;
}
