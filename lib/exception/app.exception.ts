import { HttpException } from "@nestjs/common";

export class AppException extends HttpException {
  private _code: number;
  private _args?: any;
  private _prefix?: string;

  constructor(code: number, args?: any, prefix?: string) {
    super({ code, args, prefix }, 200);
    this._code = code;
    this._args = args;
    this._prefix = prefix;
  }

  public get code() {
    return this._code;
  }

  public get args() {
    return this._args;
  }

  public get prefix() {
    return this._prefix;
  }
}
