'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.logger = void 0;
const pino_1 = __importDefault(require('pino'));
const pinoConfig = {
  level: process.env.PINO_LOG_LEVEL || 'info',
  formatters: {
    level: label => {
      return { severity: label.toUpperCase() };
    },
  },
  timestamp: pino_1.default.stdTimeFunctions.isoTime,
};
if (process.env.PINO_LOG_LEVEL === 'debug') {
  pinoConfig.transport = {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  };
}
exports.logger = (0, pino_1.default)(pinoConfig);
process.on('uncaughtException', err => {
  // log the exception
  exports.logger.fatal(err, 'uncaught exception detected');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL0xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxnREFBZ0Q7QUFFaEQsTUFBTSxVQUFVLEdBQWtCO0lBQ2hDLEtBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsSUFBSSxNQUFNO0lBQzNDLFVBQVUsRUFBRTtRQUNWLEtBQUssRUFBRSxDQUFDLEtBQWEsRUFBRSxFQUFFO1lBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUM7UUFDM0MsQ0FBQztLQUNGO0lBQ0QsU0FBUyxFQUFFLGNBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPO0NBQ3pDLENBQUM7QUFFRixJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxLQUFLLE9BQU8sRUFBRTtJQUMxQyxVQUFVLENBQUMsU0FBUyxHQUFHO1FBQ3JCLE1BQU0sRUFBRSxhQUFhO1FBQ3JCLE9BQU8sRUFBRTtZQUNQLFFBQVEsRUFBRSxJQUFJO1NBQ2Y7S0FDRixDQUFDO0NBQ0g7QUFDWSxRQUFBLE1BQU0sR0FBRyxJQUFBLGNBQUksRUFBQyxVQUFVLENBQUMsQ0FBQztBQUV2QyxPQUFPLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLEdBQUcsQ0FBQyxFQUFFO0lBQ3BDLG9CQUFvQjtJQUNwQixjQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO0lBRWpELG9DQUFvQztJQUNwQyx1QkFBdUI7SUFDdkIsa0NBQWtDO0lBQ2xDLE1BQU07SUFFTix5REFBeUQ7SUFDekQsbUNBQW1DO0lBQ25DLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxpREFBaUQ7SUFDcEUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEIsQ0FBQyxDQUFDLENBQUMifQ==
