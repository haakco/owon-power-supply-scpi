'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.logger = void 0;
const pino_1 = __importDefault(require('pino'));
exports.logger = (0, pino_1.default)({
  level: process.env.PINO_LOG_LEVEL || 'info',
  formatters: {
    level: label => {
      return { severity: label.toUpperCase() };
    },
  },
  timestamp: pino_1.default.stdTimeFunctions.isoTime,
});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL0xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxnREFBd0I7QUFFWCxRQUFBLE1BQU0sR0FBRyxJQUFBLGNBQUksRUFBQztJQUN6QixLQUFLLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLElBQUksTUFBTTtJQUMzQyxVQUFVLEVBQUU7UUFDVixLQUFLLEVBQUUsQ0FBQyxLQUFhLEVBQUUsRUFBRTtZQUN2QixPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDO1FBQzNDLENBQUM7S0FDRjtJQUNELFNBQVMsRUFBRSxjQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTztDQUN6QyxDQUFDLENBQUM7QUFFSCxPQUFPLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLEdBQUcsQ0FBQyxFQUFFO0lBQ3BDLG9CQUFvQjtJQUNwQixjQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO0lBRWpELG9DQUFvQztJQUNwQyx1QkFBdUI7SUFDdkIsa0NBQWtDO0lBQ2xDLE1BQU07SUFFTix5REFBeUQ7SUFDekQsbUNBQW1DO0lBQ25DLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxpREFBaUQ7SUFDcEUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEIsQ0FBQyxDQUFDLENBQUMifQ==
