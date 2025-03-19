import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';
import { db } from '../../../db';
import { comments } from '../../../db/schema';
import { eq } from 'drizzle-orm';
import dayjs from 'dayjs';

const commentsSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string(),
	comment: z.string(),
});

export const PutCommentsRouter: FastifyPluginAsyncZod = async (app) => {
	app.put(
		'/comments',
		{
			schema: {
				body: commentsSchema,
			},
		},
		async (req, _) => {
			const { id, name, email, comment } = req.body;

			const updatedComment = await db
				.update(comments)
				.set({
					name,
					email,
					comment,
					updatedAt: dayjs(new Date()).format('YYYY-MM-DD'),
				})
				.where(eq(comments.id, id))
				.returning();

			return updatedComment;
		},
	);
};
