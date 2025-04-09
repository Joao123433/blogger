import { Catch, HttpException, ExceptionFilter, ArgumentsHost } from "@nestjs/common";
import { FastifyRequest, FastifyReply, } from 'fastify';

@Catch(HttpException)
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp()

    const request = context.getRequest<FastifyRequest>()
    const response = context.getResponse<FastifyReply>()
    const status = exception.getStatus()

    response.status(status).send({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message !== '' ? exception.message : "Error performing the operation"
    })
  }
}