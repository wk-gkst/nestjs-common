export interface Translator {
  translate(
    key: string,
    params: {
      lang: string;
      args?: any;
    },
  ): string | Promise<string>;
}

export class NullTranslator implements Translator {
  translate(
    key: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: { lang: string; args?: any },
  ): string | Promise<string> {
    return key;
  }
}
