import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';

export const UserLoginRouter: FastifyPluginAsyncZod = async (app) => {
	app.post('/logout', async (req, res) => {
		res.clearCookie('token', {
			path: '/',
		});

		res.send({ message: 'Logout realizado com sucesso' });
	});
};
