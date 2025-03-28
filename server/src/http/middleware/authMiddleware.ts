import type { FastifyReply, FastifyRequest } from 'fastify';

export async function authMiddleware(req: FastifyRequest, res: FastifyReply) {
	if (req.url === '/login' || req.url === '/register') {
		return;
	}

	try {
		if (!req.cookies) {
			throw new Error('Cookies are not enabled');
		}

		const token = req.cookies.token;
		if (!token) {
			throw new Error('Token is missing');
		}

		await req.jwtVerify();
	} catch (err) {
		res.status(401).send({ message: 'Invalid or missing token' });
	}
}
