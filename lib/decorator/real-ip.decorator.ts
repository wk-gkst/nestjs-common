import * as requestIp from "request-ip";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const RealIP = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (request.clientIp) return request.clientIp;
    // In case we forgot to include requestIp.mw() in main.ts
    return requestIp.getClientIp(request);
  },
);
