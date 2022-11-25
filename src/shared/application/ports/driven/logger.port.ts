export enum LogLevel {
  Debug = 'debug',
  Error = 'error',
  Info = 'info',
  Warn = 'warn',
}

interface LogMethod {
  (msg: string, meta: object): void;
  (obj: unknown): void;
}

export interface LoggerPort {
  debug: LogMethod;
  info: LogMethod;
  warn: LogMethod;
  error: LogMethod;
}

export interface LoggerConfig {
  readonly level: LogLevel;
}

export const LOGGER = Symbol.for('Logger');
