import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';
import { db } from '../../../db';
import { comments } from '../../../db/schema';
import { eq } from 'drizzle-orm';

export const DeleteCommentsRouter: FastifyPluginAsyncZod = async (app) => {
	app.delete(
		'/comments',
		{
			schema: {
				body: z.object({ id: z.string() }),
			},
		},
		async (req, _) => {
			const { id } = req.body;

			const deleteComment = await db
				.delete(comments)
				.where(eq(comments.id, id))
				.returning();

			return deleteComment;
		},
	);
};
