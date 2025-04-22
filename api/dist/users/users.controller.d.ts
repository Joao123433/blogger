import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { FastifyRequest } from 'fastify';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    findOneUser(payloadToken: PayloadDto): Promise<import("./dto/response.dto").ResponseFindUserDto>;
    createUser(body: CreateUserDto): Promise<import("./dto/response.dto").ResponseCreateUserDto>;
    updateUser(id: string, body: UpdateUserDto, payloadToken: PayloadDto): Promise<import("./dto/response.dto").ResponseUpdateUserDto>;
    deleteUser(id: string, payloadToken: PayloadDto): Promise<{
        message: string;
    }>;
    uploadAvatarFile(req: FastifyRequest, payloadToken: PayloadDto): Promise<import("./dto/response.dto").ResponseUpdateAvatarDto>;
}
