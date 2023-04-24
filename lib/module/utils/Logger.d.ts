export declare const logger: import('pino').Logger<{
  level: string;
  formatters: {
    level: (label: string) => {
      severity: string;
    };
  };
  timestamp: () => string;
}>;
