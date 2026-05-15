// Interfaces
export type {
  LogLevel,
  LogContext,
  ILogDetails,
  ISerializedError,
  ILogEntry,
  ILoggerTransport,
  ILogger,
} from "./types";

// Transports
export { ConsoleTransport } from "./transports";

// Services
export {
  loggerService,
  createLogger,
  appLogger,
} from "./services/LoggerService";

// Utils
export { isPlainObject } from "./utils/isPlainObject";
export { joinScope } from "./utils/joinScope";
export { mergeContexts } from "./utils/mergeContexts";
export { mergeInto } from "./utils/mergeInto";
export { serializeError } from "./utils/serializeError";
export { sanitizeLogEntry } from "./redaction";
