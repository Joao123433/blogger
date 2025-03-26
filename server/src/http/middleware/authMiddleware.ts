import type { FastifyReply, FastifyRequest } from 'fastify';

export async function authMiddleware(req: FastifyRequest, res: FastifyReply) {
	if (req.url === '/login' || req.url === '/register') {
		return;
	}

	try {
		if (!req.cookies) {
			throw new Error('Cookies não estão habilitados');
		}

		const token = req.cookies.token;
		if (!token) {
			throw new Error('Token ausente');
		}

		await req.jwtVerify();
	} catch (err) {
		res.status(401).send({ message: 'Token inválido ou ausente' });
	}
}
