import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createId } from '@paralleldrive/cuid2';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/commom/dto/Pagination.dto';
import { CreatePostDto } from './dto/create-posts.dto';
import { UpdatePostDto } from './dto/update-post-dto';
import { PayloadDto } from 'src/auth/dto/payload.dto';

@Injectable()
export class PostsService {
	constructor(private prisma: PrismaService) {}

	async findAll(pagination: PaginationDto) {
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

	async findById(id: string) {
		const post = await this.prisma.posts.findFirst({
			where: {
				id: id,
			},
		});

		if (!post) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

		return post;
	}

	async createOne(body: CreatePostDto, payloadToken: PayloadDto) {
		const newPost = await this.prisma.posts.create({
			data: {
				id: createId(),
				title: body.title,
				introduction: body.introduction,
				story: body.story,
				conclusion: body.conclusion,
				userId: payloadToken.sub
			},
		});

		return newPost;
	}

	async updateOne(id: string, body: UpdatePostDto) {
		try {
			const findPost = await this.prisma.posts.findFirst({
				where: {
					id: id,
				},
			});

			if (!findPost)
				throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

			const post = await this.prisma.posts.update({
				where: {
					id: findPost.id,
				},
				data: body,
			});

			return post;
		} catch (error) {
			throw new HttpException('Error updating post', HttpStatus.BAD_REQUEST);
		}
	}

	async deleteOne(id: string) {
		try {
			const findPost = await this.prisma.posts.findFirst({
				where: {
					id: id,
				},
			});

			if (!findPost)
				throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

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
