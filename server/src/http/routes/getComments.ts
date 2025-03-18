import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { db } from '../../db';
import { comments } from '../../db/schema';
import z from 'zod';

// VALIDACAO DA RESPOSTA
const commentsSchema = z.object({
	id: z.string().nonempty(),
	name: z.string().nonempty(),
	email: z.string().email().nonempty(),
	comment: z.string().nonempty(),
	idPost: z.string().nonempty(),
});

export const getCommentsRouter: FastifyPluginAsyncZod = async (app) => {
	app.get(
		'/comments',
		{ schema: { response: { 200: z.array(commentsSchema) } } },
		async () =>
			await db
				.select({
					id: comments.id,
					name: comments.name,
					email: comments.email,
					comment: comments.comment,
					idPost: comments.idPost,
				})
				.from(comments),
	);
};
