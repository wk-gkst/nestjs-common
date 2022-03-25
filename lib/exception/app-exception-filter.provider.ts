import { Provider } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { AppExceptionFilter } from "./app-exception.filter";

export const createAppExceptionFilterProvider = {
  provide: APP_FILTER,
  useClass: AppExceptionFilter,
} as Provider;
