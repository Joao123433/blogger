import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';
import { db } from '../../../db';
import { posts } from '../../../db/schema';
import { eq } from 'drizzle-orm';

// VALIDADAO DA RESPOSTA
const postsSchema = z.object({
	id: z.string().nonempty(),
	title: z.string().nonempty(),
	introduction: z.string().nonempty(),
	story: z.string().nonempty(),
	conclusion: z.string().nonempty(),
	createdAt: z.string().nonempty(),
});

export const GetPostRouter: FastifyPluginAsyncZod = async (app) => {
	app.get(
		'/post',
		{
			schema: {
				headers: z.object({
					id: z.string(),
				}),
				response: {
					200: postsSchema,
				},
			},
		},
		async (req, _) => {
			const { id } = req.headers;

			const [fetchPost] = await db
				.select({
					id: posts.id,
					title: posts.title,
					introduction: posts.introduction,
					story: posts.story,
					conclusion: posts.conclusion,
					createdAt: posts.createdAt,
				})
				.from(posts)
				.where(eq(posts.id, id));

			return fetchPost;
		},
	);
};
