import { HttpException } from "@nestjs/common";

export class AppException extends HttpException {
  private _code: number;
  private _args?: any;

  constructor(code: number, args?: any, prefix?: string) {
    super({ code, args, prefix }, 200);
  }

  public get code() {
    return this._code;
  }

  public get args() {
    return this._args;
  }
}
