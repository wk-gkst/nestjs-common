import { JsonResponse } from "@gkst/common";
import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";
import { Response } from "express";
import { I18nService } from "nestjs-i18n";
import { AppException } from "./app.exception";

/**
 * depend on nestjs-i18n, I18nModule must be register
 */
@Catch(AppException)
export class AppExceptionsFilter implements ExceptionFilter {
  constructor(private readonly i18n: I18nService) {}

  async catch(exception: AppException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();

    const exceptionArgs = response.getResponse() as {
      code: number;
      args?: any;
      prefix?: string;
    };

    const prefix = exceptionArgs.prefix || "exception";

    const message = await this.i18n.translate(`${prefix}.${exception.code}`, {
      lang: ctx.getRequest().i18nLang,
      args: exception.args,
    });

    response
      .status(statusCode)
      .json(JsonResponse.Error(exception.code, message));
  }
}
