import { JsonResponse } from "@gkst/common";
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Logger,
  Optional,
} from "@nestjs/common";
import { Response } from "express";
import { I18nService } from "nestjs-i18n";
import { AppException } from "./app.exception";

/**
 * depend on nestjs-i18n, I18nModule must be register
 */
@Catch(AppException)
export class AppExceptionFilter implements ExceptionFilter {
  private logger = new Logger(AppExceptionFilter.name);
  constructor(
    @Optional()
    private readonly i18n: I18nService) { }

  async catch(exception: AppException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();

    const prefix = exception.prefix || "exception";
    let message = exception.code + "";
    if (this.i18n) {
      message = await this.i18n.translate(`${prefix}.${exception.code}`, {
        lang: ctx.getRequest().i18nLang,
        args: exception.args,
      });
    } else {
      this.logger.warn(
        "I18nModule was not register. will to resolve AppException Message",
      );
    }

    response
      .status(statusCode)
      .json(JsonResponse.Error(exception.code, message));
  }
}
