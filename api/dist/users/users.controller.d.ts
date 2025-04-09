import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    findOneUser(id: string): Promise<{
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
    createUser(body: CreateUserDto): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date | null;
        name: string;
        email: string;
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
