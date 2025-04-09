import { NestMiddleware } from "@nestjs/common";
import { FastifyRequest, FastifyReply } from 'fastify';
export declare class LoggerMiddleware implements NestMiddleware {
    use(req: FastifyRequest, res: FastifyReply, next: (error?: any) => void): void;
}
