import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';
import { db } from '../../../db';
import { users } from '../../../db/schema/users';
import { eq } from 'drizzle-orm';
import { compare } from 'bcrypt';

export const UserLoginRouter: FastifyPluginAsyncZod = async (app) => {
	app.post(
		'/login',
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

			const [user] = await db
				.select({
					id: users.id,
					email: users.email,
					password: users.password,
					name: users.name,
				})
				.from(users)
				.where(eq(users.email, email))
				.limit(1);

			const verifyPassword = await compare(password, user.password);

			if (!user || !verifyPassword) {
				return res.status(401).send({ message: 'Credenciais inválidas' });
			}

			const token = app.jwt.sign({
				id: user.id,
				email: user.email,
				name: user.name,
			});

			res.send({ token });
		},
	);
};
