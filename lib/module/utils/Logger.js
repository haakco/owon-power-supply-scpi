import Pino from 'pino';
const pinoConfig = {
  level: process.env.PINO_LOG_LEVEL || 'info',
  formatters: {
    level: label => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL0xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLElBQTRCLE1BQU0sTUFBTSxDQUFDO0FBRWhELE1BQU0sVUFBVSxHQUFrQjtJQUNoQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLElBQUksTUFBTTtJQUMzQyxVQUFVLEVBQUU7UUFDVixLQUFLLEVBQUUsQ0FBQyxLQUFhLEVBQUUsRUFBRTtZQUN2QixPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDO1FBQzNDLENBQUM7S0FDRjtJQUNELFNBQVMsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTztDQUN6QyxDQUFDO0FBRUYsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsS0FBSyxPQUFPLEVBQUU7SUFDMUMsVUFBVSxDQUFDLFNBQVMsR0FBRztRQUNyQixNQUFNLEVBQUUsYUFBYTtRQUNyQixPQUFPLEVBQUU7WUFDUCxRQUFRLEVBQUUsSUFBSTtTQUNmO0tBQ0YsQ0FBQztDQUNIO0FBQ0QsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUV2QyxPQUFPLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLEdBQUcsQ0FBQyxFQUFFO0lBQ3BDLG9CQUFvQjtJQUNwQixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO0lBRWpELG9DQUFvQztJQUNwQyx1QkFBdUI7SUFDdkIsa0NBQWtDO0lBQ2xDLE1BQU07SUFFTix5REFBeUQ7SUFDekQsbUNBQW1DO0lBQ25DLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxpREFBaUQ7SUFDcEUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEIsQ0FBQyxDQUFDLENBQUMifQ==
