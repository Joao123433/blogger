import { NestMiddleware } from "@nestjs/common";
import { FastifyRequest, FastifyReply, } from 'fastify';

export class LoggerMiddleware implements NestMiddleware {
  use(req: FastifyRequest, res: FastifyReply, next: (error?: any) => void) {
    console.log('[MIDDLWARE] Request...')
		
    next()
  }
}