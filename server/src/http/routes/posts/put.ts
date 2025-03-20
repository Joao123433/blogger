import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';
import { db } from '../../../db';
import { posts } from '../../../db/schema';
import { eq } from 'drizzle-orm';
import dayjs from 'dayjs';

const PostSchema = z.object({
	id: z.string().nonempty(),
	title: z.string().nonempty(),
	introduction: z.string().nonempty(),
	story: z.string().nonempty(),
	conclusion: z.string().nonempty(),
});

export const PutPostRouter: FastifyPluginAsyncZod = async (app) => {
	app.put(
		'/posts',
		{
			schema: {
				body: PostSchema,
			},
		},
		async (req, _) => {
			const { id, title, introduction, story, conclusion } = req.body;

			const updatedPost = await db
				.update(posts)
				.set({
					title,
					introduction,
					story,
					conclusion,
					updatedAt: dayjs(new Date()).format('YYYY-MM-DD'),
				})
				.where(eq(posts.id, id));

			return updatedPost;
		},
	);
};
