import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';
import { db } from '../../../db';
import { comments } from '../../../db/schema';
import { eq } from 'drizzle-orm';

const commentsSchema = z.object({
	id: z.string().nonempty(),
	name: z.string().nonempty(),
	email: z.string().email().nonempty(),
	comment: z.string().nonempty(),
	idPost: z.string().nonempty(),
	createdAt: z.string().nonempty(),
});

export const GetCommentRouter: FastifyPluginAsyncZod = async (app) => {
	app.get(
		'/comment',
		{
			schema: {
				headers: z.object({
					id: z.string(),
				}),
				response: {
					200: commentsSchema,
				},
			},
		},
		async (req, _) => {
			const id = req.headers.id;

			const [FetchComment] = await db
				.select({
					id: comments.id,
					name: comments.name,
					email: comments.email,
					comment: comments.comment,
					idPost: comments.idPost,
					createdAt: comments.createdAt,
				})
				.from(comments)
				.where(eq(comments.id, id));

			return FetchComment;
		},
	);
};
