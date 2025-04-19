"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const cuid2_1 = require("@paralleldrive/cuid2");
const hashing_service_1 = require("../auth/hash/hashing.service");
let UsersService = class UsersService {
    prisma;
    hashingService;
    constructor(prisma, hashingService) {
        this.prisma = prisma;
        this.hashingService = hashingService;
    }
    async findOne(payloadToken) {
        try {
            const findUser = await this.prisma.users.findFirst({
                where: {
                    id: payloadToken.sub
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    created_at: true,
                    updated_at: true,
                    Posts: true,
                    Comments: true
                }
            });
            if (!findUser)
                throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
            return findUser;
        }
        catch (error) {
            throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
        }
    }
    async createOne(body) {
        try {
            const passwordHash = await this.hashingService.hash(body.passwordHash);
            const user = await this.prisma.users.create({
                data: {
                    id: (0, cuid2_1.createId)(),
                    name: body.name,
                    email: body.email,
                    passwordHash: passwordHash
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    created_at: true,
                    updated_at: true
                }
            });
            return user;
        }
        catch (error) {
            throw new common_1.HttpException("Error creating user", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateOne(id, body, payloadToken) {
        try {
            const findUser = await this.prisma.users.findFirst({
                where: {
                    id: id
                }
            });
            if (!findUser)
                throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
            if (findUser.id !== payloadToken.sub)
                throw new common_1.HttpException("Access denied", common_1.HttpStatus.NOT_FOUND);
            const dataUser = {
                name: body?.name ? body.name : findUser.name
            };
            if (body?.passwordHash) {
                const passwordHash = await this.hashingService.hash(body?.passwordHash);
                dataUser['passwordHash'] = passwordHash;
            }
            const user = await this.prisma.users.update({
                where: {
                    id: id
                },
                data: {
                    name: dataUser.name,
                    passwordHash: dataUser?.passwordHash ? dataUser.passwordHash : findUser.passwordHash,
                    updated_at: new Date()
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            });
            return user;
        }
        catch (error) {
            throw new common_1.HttpException("Error updating user", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteOne(id, payloadToken) {
        try {
            const findUser = await this.prisma.users.findFirst({
                where: {
                    id: id
                }
            });
            if (!findUser)
                throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
            if (findUser.id !== payloadToken.sub)
                throw new common_1.HttpException("Access denied", common_1.HttpStatus.NOT_FOUND);
            await this.prisma.users.delete({
                where: {
                    id: id
                }
            });
            return { message: "User deleted successfully" };
        }
        catch (error) {
            throw new common_1.HttpException("Error deleting user", common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        hashing_service_1.HashingServiceProtocol])
], UsersService);
//# sourceMappingURL=users.service.js.map