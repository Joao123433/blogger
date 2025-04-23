import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createId } from '@paralleldrive/cuid2';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/commom/dto/Pagination.dto';
import { CreatePostDto } from './dto/create-posts.dto';
import { UpdatePostDto } from './dto/update-post-dto';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { ResponseCreatePostDto, ResponseOtherDto } from './dto/response.dto';

@Injectable()
export class PostsService {
	constructor(private prisma: PrismaService) {}

	async findAll(pagination: PaginationDto): Promise<ResponseOtherDto[]> {
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

	async findById(id: string): Promise<ResponseOtherDto> {
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
	
			if (!post) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
	
			return post;
		} catch (error) {
			throw new HttpException('Error retrieving post', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createOne(body: CreatePostDto, payloadToken: PayloadDto): Promise<ResponseCreatePostDto> {
		try {
			const newPost = await this.prisma.posts.create({
				data: {
					id: createId(),
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
		} catch (error) {
			throw new HttpException('Error creating post', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateOne(id: string, body: UpdatePostDto, payloadToken: PayloadDto): Promise<ResponseOtherDto> {
		try {
			const findPost = await this.prisma.posts.findFirst({
				where: {
					id: id,
				},
			});

			if (!findPost)
				throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

			if(findPost.userId !== payloadToken.sub) throw new HttpException("Access denied", HttpStatus.NOT_FOUND)

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
		} catch (error) {
			throw new HttpException('Error updating post', HttpStatus.BAD_REQUEST);
		}
	}

	async deleteOne(id: string, payloadToken: PayloadDto) {
		try {
			const findPost = await this.prisma.posts.findFirst({
				where: {
					id: id,
				},
			});

			if (!findPost)
				throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

			if(findPost.userId !== payloadToken.sub) throw new HttpException("Access denied", HttpStatus.NOT_FOUND)

			await this.prisma.posts.delete({
				where: {
					id: id,
				},
			});

			return { message: 'Post deleted successfully' };
		} catch (error) {
			throw new HttpException('Error deleting post', HttpStatus.BAD_REQUEST);
		}
	}
}
