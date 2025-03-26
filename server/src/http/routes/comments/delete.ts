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
		async (req, res) => {
			const { id } = req.body;

			try {
				const deleteComment = await db
					.delete(comments)
					.where(eq(comments.id, id))
					.returning();

				if (deleteComment.length) {
					return res.status(404).send({ error: 'Comment not found' });
				}

				return res
					.status(200)
					.send({ message: 'Comment deleted successfully' });
			} catch (error) {
				return res.status(500).send({ error: 'Failed to delete comment' });
			}
		},
	);
};
