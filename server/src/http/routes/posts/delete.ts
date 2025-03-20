import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';
import { db } from '../../../db';
import { posts } from '../../../db/schema';
import { eq } from 'drizzle-orm';

export const DeletePostRouter: FastifyPluginAsyncZod = async (app) => {
	app.delete(
		'/posts',
		{
			schema: {
				body: z.object({ id: z.string() }),
			},
		},
		async (req, _) => {
			const { id } = req.body;

			const deletedPost = await db
				.delete(posts)
				.where(eq(posts.id, id))
				.returning();

			return deletedPost;
		},
	);
};
