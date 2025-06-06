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
const prisma_service_1 = require("../prisma/prisma.service");
const cuid2_1 = require("@paralleldrive/cuid2");
let PostsService = class PostsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(pagination) {
        const { limit = 6, offset = 0 } = pagination;
        const posts = await this.prisma.posts.findMany({
            select: {
                id: true,
                title: true,
                introduction: true,
                story: true,
                conclusion: true,
                created_at: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        created_at: true
                    }
                },
                Comments: {
                    select: {
                        comment: true,
                        id: true,
                        user: {
                            select: {
                                name: true,
                                email: true,
                                created_at: true
                            }
                        }
                    }
                }
            },
            take: limit,
            skip: offset,
            orderBy: {
                title: 'asc',
            },
        });
        return posts;
    }
    async findById(id) {
        try {
            const post = await this.prisma.posts.findFirst({
                select: {
                    id: true,
                    title: true,
                    introduction: true,
                    story: true,
                    conclusion: true,
                    created_at: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            created_at: true
                        }
                    },
                    Comments: {
                        select: {
                            id: true,
                            comment: true,
                            user: {
                                select: {
                                    name: true,
                                    email: true,
                                    created_at: true
                                }
                            }
                        }
                    }
                },
                where: {
                    id: id,
                },
            });
            if (!post)
                throw new common_1.HttpException('Post not found', common_1.HttpStatus.NOT_FOUND);
            return post;
        }
        catch (error) {
            throw new common_1.HttpException('Error retrieving post', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createOne(body, payloadToken) {
        try {
            const newPost = await this.prisma.posts.create({
                data: {
                    id: (0, cuid2_1.createId)(),
                    title: body.title,
                    introduction: body.introduction,
                    story: body.story,
                    conclusion: body.conclusion,
                    userId: payloadToken.sub
                },
                select: {
                    id: true,
                    title: true,
                    introduction: true,
                    story: true,
                    conclusion: true,
                    created_at: true,
                    user: {
                        select: {
                            name: true,
                            email: true,
                            created_at: true
                        }
                    }
                }
            });
            return newPost;
        }
        catch (error) {
            throw new common_1.HttpException('Error creating post', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateOne(id, body, payloadToken) {
        try {
            const findPost = await this.prisma.posts.findFirst({
                where: {
                    id: id,
                },
            });
            if (!findPost)
                throw new common_1.HttpException('Post not found', common_1.HttpStatus.NOT_FOUND);
            if (findPost.userId !== payloadToken.sub)
                throw new common_1.HttpException("Access denied", common_1.HttpStatus.NOT_FOUND);
            const post = await this.prisma.posts.update({
                where: {
                    id: findPost.id,
                },
                data: {
                    ...body,
                    updated_at: new Date()
                },
                select: {
                    id: true,
                    title: true,
                    introduction: true,
                    story: true,
                    conclusion: true,
                    created_at: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            created_at: true
                        }
                    },
                    Comments: {
                        select: {
                            id: true,
                            comment: true,
                            user: {
                                select: {
                                    name: true,
                                    email: true,
                                    created_at: true
                                }
                            }
                        }
                    }
                },
            });
            return post;
        }
        catch (error) {
            throw new common_1.HttpException('Error updating post', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteOne(id, payloadToken) {
        try {
            const findPost = await this.prisma.posts.findFirst({
                where: {
                    id: id,
                },
            });
            if (!findPost)
                throw new common_1.HttpException('Post not found', common_1.HttpStatus.NOT_FOUND);
            if (findPost.userId !== payloadToken.sub)
                throw new common_1.HttpException("Access denied", common_1.HttpStatus.NOT_FOUND);
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