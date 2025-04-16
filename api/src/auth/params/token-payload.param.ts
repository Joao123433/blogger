import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AUTH_TOKEN_PAYLOAD } from "../commom/auth.constants";

export const TokenPayloadParam = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = context.switchToHttp()
    const request = ctx.getRequest()

    return request[AUTH_TOKEN_PAYLOAD]
  }
)