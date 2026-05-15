import type { ILogEntry, ILoggerTransport, LogLevel } from "@utils/logger";

export class ConsoleTransport implements ILoggerTransport {
  log(entry: ILogEntry) {
    const prefix = `[${entry.timestamp}] [${entry.level.toUpperCase()}] [${entry.scope}]`;

    const method = this.getConsoleMethod(entry.level);
    const payload =
      entry.context || entry.error
        ? {
            ...(entry.context ? { context: entry.context } : {}),
            ...(entry.error ? { error: entry.error } : {}),
          }
        : undefined;

    if (payload) {
      method(`${prefix} ${entry.message}`, payload);
      return;
    }

    method(`${prefix} ${entry.message}`);
  }

  private getConsoleMethod(level: LogLevel) {
    switch (level) {
      case "debug":
        return console.debug.bind(console);
      case "info":
        return console.info.bind(console);
      case "warn":
        return console.warn.bind(console);
      case "error":
        return console.error.bind(console);
    }
  }
}
