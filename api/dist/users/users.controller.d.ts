import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    findOneUser(id: string): Promise<{
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
    createUser(body: CreateUserDto): Promise<{
        id: string;
        name: string;
        email: string;
        created_at: Date;
        updated_at: Date | null;
    }>;
    updateUser(id: string, body: UpdateUserDto): Promise<{
        id: string;
        name: string;
        email: string;
    }>;
    deleteUser(id: string): Promise<{
        message: string;
    }>;
}
