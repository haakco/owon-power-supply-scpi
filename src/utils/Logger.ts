import Pino from 'pino';

export const logger = Pino({
  level: process.env.PINO_LOG_LEVEL || 'info',
  formatters: {
    level: (label: string) => {
      return { severity: label.toUpperCase() };
    },
  },
  timestamp: Pino.stdTimeFunctions.isoTime,
});

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
