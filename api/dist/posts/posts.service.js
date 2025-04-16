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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const cuid2_1 = require("@paralleldrive/cuid2");
const prisma_service_1 = require("../prisma/prisma.service");
let PostsService = class PostsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(pagination) {
        const { limit = 6, offset = 0 } = pagination;
        const posts = await this.prisma.posts.findMany({
            take: limit,
            skip: offset,
            orderBy: {
                title: 'asc',
            },
        });
        return posts;
    }
    async findById(id) {
        const post = await this.prisma.posts.findFirst({
            where: {
                id: id,
            },
        });
        if (!post)
            throw new common_1.HttpException('Post not found', common_1.HttpStatus.NOT_FOUND);
        return post;
    }
    async createOne(body, payloadToken) {
        const newPost = await this.prisma.posts.create({
            data: {
                id: (0, cuid2_1.createId)(),
                title: body.title,
                introduction: body.introduction,
                story: body.story,
                conclusion: body.conclusion,
                userId: payloadToken.sub
            },
        });
        return newPost;
    }
    async updateOne(id, body) {
        try {
            const findPost = await this.prisma.posts.findFirst({
                where: {
                    id: id,
                },
            });
            if (!findPost)
                throw new common_1.HttpException('Post not found', common_1.HttpStatus.NOT_FOUND);
            const post = await this.prisma.posts.update({
                where: {
                    id: findPost.id,
                },
                data: body,
            });
            return post;
        }
        catch (error) {
            throw new common_1.HttpException('Error updating post', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteOne(id) {
        try {
            const findPost = await this.prisma.posts.findFirst({
                where: {
                    id: id,
                },
            });
            if (!findPost)
                throw new common_1.HttpException('Post not found', common_1.HttpStatus.NOT_FOUND);
            await this.prisma.posts.delete({
                where: {
                    id: id,
                },
            });
            return { message: 'Post deleted successfully' };
        }
        catch (error) {
            throw new common_1.HttpException('Error deleting post', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostsService);
//# sourceMappingURL=posts.service.js.map