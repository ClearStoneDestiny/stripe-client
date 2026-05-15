import { env } from "@config/env";
import {
  ConsoleTransport,
  joinScope,
  mergeContexts,
  sanitizeLogEntry,
  serializeError,
} from "@utils/logger";
import type {
  ILogDetails,
  ILogEntry,
  LogContext,
  ILogger,
  ILoggerTransport,
  LogLevel,
} from "@utils/logger/types";

const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

class LoggerService {
  private readonly transports: ILoggerTransport[] = [];
  private minLevel: LogLevel;
  private globalContext: LogContext = {};

  constructor(options?: {
    minLevel?: LogLevel;
    transports?: ILoggerTransport[];
  }) {
    this.minLevel = options?.minLevel ?? (env.isDev ? "debug" : "info");
    options?.transports?.forEach((transport) => this.addTransport(transport));
  }

  addTransport(transport: ILoggerTransport) {
    this.transports.push(transport);
  }

  setMinLevel(level: LogLevel) {
    this.minLevel = level;
  }

  replaceGlobalContext(context: LogContext) {
    this.globalContext = mergeContexts(context) ?? {};
  }

  mergeGlobalContext(context: LogContext) {
    this.globalContext = mergeContexts(this.globalContext, context) ?? {};
  }

  clearGlobalContext() {
    this.globalContext = {};
  }

  createLogger(scope: string, defaultContext: LogContext = {}): ILogger {
    const write = (level: LogLevel, message: string, details?: ILogDetails) => {
      const mergedContext = mergeContexts(
        this.globalContext,
        defaultContext,
        details?.context,
      );

      this.write(level, scope, message, {
        context: mergedContext,
        error: details?.error,
      });
    };

    return {
      debug: (message, details) => write("debug", message, details),
      info: (message, details) => write("info", message, details),
      warn: (message, details) => write("warn", message, details),
      error: (message, details) => write("error", message, details),
      child: (childScope, childContext = {}) =>
        this.createLogger(
          joinScope(scope, childScope),
          mergeContexts(defaultContext, childContext) ?? {},
        ),
    };
  }

  private shouldLog(level: LogLevel) {
    return LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[this.minLevel];
  }

  private write(
    level: LogLevel,
    scope: string,
    message: string,
    details?: ILogDetails,
  ) {
    if (!this.shouldLog(level)) {
      return;
    }

    const rawEntry: ILogEntry = {
      timestamp: new Date().toISOString(),
      level,
      scope,
      message,
      context: details?.context,
      error: serializeError(details?.error),
    };

    const entry = sanitizeLogEntry(rawEntry);

    this.transports.forEach((transport) => {
      try {
        void Promise.resolve(transport.log(entry)).catch((transportError) => {
          console.error("[Logger transport failed]", transportError);
        });
      } catch (transportError) {
        console.error("[Logger transport failed]", transportError);
      }
    });
  }
}

const transports = env.isDev ? [new ConsoleTransport()] : [];

export const loggerService = new LoggerService({
  minLevel: env.isDev ? "debug" : "warn",
  transports,
});

export const createLogger = (scope: string, defaultContext?: LogContext) =>
  loggerService.createLogger(scope, defaultContext);

export const appLogger = createLogger("app");
