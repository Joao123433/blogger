import { hash } from 'bcrypt';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';
import { db } from '../../../db';
import { users } from '../../../db/schema/users';
import dayjs from 'dayjs';

export const UserRegisterRouter: FastifyPluginAsyncZod = async (app) => {
	app.post(
		'/register',
		{
			schema: {
				body: z.object({
					email: z.string(),
					password: z.string(),
					name: z.string(),
				}),
			},
		},
		async (req, res) => {
			const { email, password, name } = req.body;
			const hashedPassword = await hash(password, 10);

			const [user] = await db
				.insert(users)
				.values({
					email,
					password: hashedPassword,
					name,
					createdAt: dayjs(new Date()).format('YYYY-MM-DD'),
					updatedAt: dayjs(new Date()).format('YYYY-MM-DD'),
				})
				.returning();

			const token = app.jwt.sign({
				id: user.id,
				email: user.email,
				name: user.name,
			});

			return res.send({ user, token });
		},
	);
};
