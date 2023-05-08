import Pino, { type LoggerOptions } from 'pino';

const pinoConfig: LoggerOptions = {
  level: process.env.PINO_LOG_LEVEL || 'info',
  formatters: {
    level: (label: string) => {
      return { severity: label.toUpperCase() };
    },
  },
  timestamp: Pino.stdTimeFunctions.isoTime,
};

if (process.env.PINO_LOG_LEVEL === 'debug') {
  pinoConfig.transport = {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  };
}
export const logger = Pino(pinoConfig);

process.on('uncaughtException', err => {
  // log the exception
  logger.fatal(err, 'uncaught exception detected');

  // // shutdown the server gracefully
  // server.close(() => {
  //   process.exit(1); // then exit
  // });

  // If a graceful shutdown is not achieved after 1 second,
  // shut down the process completely
  setTimeout(() => {
    process.abort(); // exit immediately and generate a core dump file
  }, 1000).unref();
  process.exit(1);
});
