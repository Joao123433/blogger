import { HttpException, HttpStatus, Inject, NestMiddleware } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { FastifyRequest, FastifyReply, } from 'fastify';
import { AUTH_TOKEN_PAYLOAD } from "src/auth/commom/auth.constants";
import jwtConfig from "src/auth/config/jwt.config";

export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private jwtConfiguration: ConfigType<typeof jwtConfig>
  ) {}

  use(req: FastifyRequest, res: FastifyReply, next: (error?: any) => void) {
    const token = this.extractToken(req)

    if(!token) throw new HttpException("Token not found.", HttpStatus.UNAUTHORIZED);
    
    try {
      const payload = this.jwtService.verify(token, this.jwtConfiguration)
      req[AUTH_TOKEN_PAYLOAD] = payload;
    } catch (error) {
      throw new HttpException("Invalid or expired token.", HttpStatus.UNAUTHORIZED);
    }

    next()
  }

  extractToken(request: FastifyRequest) {
    const authorization = request.headers?.authorization

    if(!authorization) return

    return authorization.split(" ")[1]
  }
}