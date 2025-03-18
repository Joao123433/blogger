import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { db } from '../../db';
import { posts } from '../../db/schema';
import z from 'zod';

// VALIDADAO DA RESPOSTA
const postsSchema = z.object({
	id: z.string(),
	title: z.string(),
	introduction: z.string(),
	story: z.string(),
	conclusion: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export const getPostsRouter: FastifyPluginAsyncZod = async (app) => {
	app.get(
		'/posts',
		{ schema: { response: { 200: z.array(postsSchema) } } },
		async () => {
			const allPosts = await db
				.select({
					id: posts.id,
					title: posts.title,
					introduction: posts.introduction,
					story: posts.story,
					conclusion: posts.conclusion,
					createdAt: posts.createdAt,
					updatedAt: posts.updatedAt,
				})
				.from(posts);

			return allPosts;
		},
	);
};
