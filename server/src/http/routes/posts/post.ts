import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';
import { db } from '../../../db';
import { posts } from '../../../db/schema';
import dayjs from 'dayjs';

const postsSchema = z.object({
	title: z.string().nonempty(),
	introduction: z.string().nonempty(),
	story: z.string().nonempty(),
	conclusion: z.string().nonempty(),
});

export const PostPostsRouter: FastifyPluginAsyncZod = async (app) => {
	app.post(
		'/posts',
		{
			schema: {
				body: postsSchema,
			},
		},
		async (req, _) => {
			const { title, introduction, story, conclusion } = req.body;

			const createdPost = await db
				.insert(posts)
				.values({
					title,
					introduction,
					story,
					conclusion,
					createdAt: dayjs(new Date()).format('YYYY-MM-DD'),
					updatedAt: dayjs(new Date()).format('YYYY-MM-DD'),
				})
				.returning();

			return createdPost;
		},
	);
};
