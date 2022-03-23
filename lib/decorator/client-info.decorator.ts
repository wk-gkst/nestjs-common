import * as requestIp from "request-ip";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { isUndefinedOrNullOrEmpty } from "@gkst/common";

export const ClientInfo = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const clientInfo = {
      country: "",
      userAgent: "",
      lang: "en_US",
      os: "",
      appId: "",
      deviceId: "",
      ip: requestIp.getClientIp(request),
    };

    if (request.headers) {
      if (!isUndefinedOrNullOrEmpty(request.headers["user-agent"])) {
        clientInfo.userAgent = request.headers["user-agent"];
      }

      if (!isUndefinedOrNullOrEmpty(request.headers["lang"])) {
        clientInfo.lang = request.headers["lang"];
      }

      if (!isUndefinedOrNullOrEmpty(request.headers["country"])) {
        clientInfo.country = request.headers["country"] as string;
      }

      if (!isUndefinedOrNullOrEmpty(request.headers["os"])) {
        clientInfo.os = request.headers["os"] as string;
      }

      if (
        !isUndefinedOrNullOrEmpty(request.headers["app-id"]) &&
        !isNaN(+request.headers["app-id"])
      ) {
        clientInfo.appId = request.headers["app-id"] as string;
      }
    }

    return clientInfo;
  },
);
