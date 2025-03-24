import type { FastifyReply, FastifyRequest } from 'fastify';

export async function authMiddleware(req: FastifyRequest, res: FastifyReply) {
	// if (req.url !== '/login' && req.url !== '/register') {
	if (req.url === '/admin') {
		try {
			await req.jwtVerify();
		} catch (err) {
			res.status(401).send({ message: 'Token inválido ou ausente' });
		}
	}
}
