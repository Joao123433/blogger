import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { FastifyRequest } from 'fastify';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    findOneUser(payloadToken: PayloadDto): Promise<{
        id: string;
        name: string;
        email: string;
        avatar: string | null;
        created_at: Date | null;
        updated_at: Date | null;
        Posts: {
            id: string;
            created_at: Date | null;
            title: string;
            introduction: string;
        }[];
        Comments: {
            id: string;
            created_at: Date | null;
            comment: string;
        }[];
    }>;
    createUser(body: CreateUserDto): Promise<{
        id: string;
        name: string;
        email: string;
        created_at: Date | null;
        updated_at: Date | null;
    }>;
    updateUser(id: string, body: UpdateUserDto, payloadToken: PayloadDto): Promise<{
        id: string;
        name: string;
        email: string;
    }>;
    deleteUser(id: string, payloadToken: PayloadDto): Promise<{
        message: string;
    }>;
    uploadAvatarFile(req: FastifyRequest, payloadToken: PayloadDto): Promise<{
        id: string;
        name: string;
        email: string;
        avatar: string | null;
    }>;
}
