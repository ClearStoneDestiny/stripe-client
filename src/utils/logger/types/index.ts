export type LogLevel = "debug" | "info" | "warn" | "error";

export type LogContext = Record<string, unknown>;

export interface ILogDetails {
  context?: LogContext;
  error?: unknown;
}

export interface ISerializedError {
  name?: string;
  message: string;
  stack?: string;
  cause?: unknown;
}

export interface ILogEntry {
  timestamp: string;
  level: LogLevel;
  scope: string;
  message: string;
  context?: LogContext;
  error?: ISerializedError;
}

export interface ILoggerTransport {
  log(entry: ILogEntry): void | Promise<void>;
}

export interface ILogger {
  debug(message: string, details?: ILogDetails): void;
  info(message: string, details?: ILogDetails): void;
  warn(message: string, details?: ILogDetails): void;
  error(message: string, details?: ILogDetails): void;
  child(scope: string, defaultContext?: LogContext): ILogger;
}
