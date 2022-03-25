import { DynamicModule, Module } from "@nestjs/common";
import {
  AcceptLanguageResolver,
  CookieResolver,
  HeaderResolver,
  I18nAsyncOptions,
  I18nJsonParser,
  I18nModule,
  I18nOptions,
  QueryResolver,
} from "nestjs-i18n";
import { join } from "path";

/**
 * Wrapper module to simplify Registration Options with own default options on AppModule
 * 1.) default i18n is process.cwd()/dist/i18n, which is application running path
 */
@Module({})
export class I18nCoreModule {
  static forRoot(options?: I18nOptions): DynamicModule {
    return {
      module: I18nCoreModule,
      imports: [I18nModule.forRoot(this.sanitizeI18nOptions(options))],
      exports: [I18nModule],
    };
  }

  static forRootAsync(options?: I18nAsyncOptions): DynamicModule {
    return {
      module: I18nCoreModule,
      imports: [
        I18nModule.forRootAsync(this.sanitizeI18nAsyncOptions(options)),
      ],
      exports: [I18nModule],
    };
  }

  private static sanitizeI18nOptions(options: I18nOptions) {
    options = { ...defaultOptions, ...options };
    return options;
  }

  private static sanitizeI18nAsyncOptions(options: I18nAsyncOptions) {
    options = { ...defaultAsyncOptions, ...options };
    return options;
  }
}

const defaultResolvers = [
  {
    use: QueryResolver,
    options: ["lang"],
  },
  new HeaderResolver(["lang"]),
  AcceptLanguageResolver,
  new CookieResolver(["lang"]),
];

const defaultParser = I18nJsonParser;

const defaultPath =
  process.env.NODE_ENV == "development" ? "src/i18n/" : "dist/i18n/";

const defaultOptions: Partial<I18nOptions> = {
  fallbackLanguage: process.env.LOCALES_FALLBACK_LANGUAGE || "en_US",
  resolvers: defaultResolvers,
  parser: defaultParser,
  parserOptions: {
    path: join(process.cwd(), process.env.LOCALES_MAP_PATH || defaultPath),
    watch: process.env.LOCALES_LIVE_RELOAD == "true",
  },
};

const defaultAsyncOptions: Partial<I18nAsyncOptions> = {
  resolvers: defaultResolvers,
  parser: defaultParser,
  useFactory: () => {
    return {
      fallbackLanguage: defaultOptions.fallbackLanguage,
      parserOptions: {
        path: join(process.cwd(), process.env.LOCALES_MAP_PATH || defaultPath),
        watch: process.env.LOCALES_LIVE_RELOAD == "true",
      },
    };
  },
};
