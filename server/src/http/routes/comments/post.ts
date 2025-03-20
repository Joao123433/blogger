import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';
import { db } from '../../../db';
import { comments } from '../../../db/schema';
import dayjs from 'dayjs';

const commentsSchema = z.object({
	name: z.string().nonempty(),
	email: z.string().nonempty(),
	comment: z.string().nonempty(),
	idPost: z.string().nonempty(),
});

export const PostCommentsRouter: FastifyPluginAsyncZod = async (app) => {
	app.post(
		'/comments',
		{
			schema: {
				body: commentsSchema,
			},
		},
		async (req, _) => {
			const { name, email, comment, idPost } = req.body;

			const [createdComment] = await db
				.insert(comments)
				.values({
					name,
					email,
					comment,
					idPost,
					createdAt: dayjs(new Date()).format('YYYY-MM-DD'),
					updatedAt: dayjs(new Date()).format('YYYY-MM-DD'),
				})
				.returning();

			return createdComment;
		},
	);
};
