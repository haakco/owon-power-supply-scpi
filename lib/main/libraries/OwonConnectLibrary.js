'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.OwonConnectLibrary = exports.OwonLibraryDefaultConfig = void 0;
const serialport_1 = require('serialport');
const Logger_1 = require('../utils/Logger');
exports.OwonLibraryDefaultConfig = {
  path: '/dev/cu.usbserial-5410',
  baudRate: 115200,
  dataBits: 8,
  parity: 'none',
};
class OwonConnectLibrary {
  constructor(path, config) {
    if (!path) throw new Error('Port is required');
    this.config = Object.assign(
      Object.assign(
        Object.assign({}, exports.OwonLibraryDefaultConfig),
        config !== null && config !== void 0 ? config : {},
      ),
      { path },
    );
  }
  async open() {
    return new Promise((resolve, reject) => {
      this.port = new serialport_1.SerialPort(this.config, function (err) {
        if (err) {
          Logger_1.logger.error('Error: ', err.message);
          reject(err);
        }
      });
      this.parser = this.port.pipe(new serialport_1.ReadlineParser());
      this.parser.on('error', function (err) {
        Logger_1.logger.error('Error: ', err.message);
      });
      this.port.on('open', async err => {
        if (err) {
          Logger_1.logger.error('Error opening serial port:', err);
          reject(err);
        } else {
          Logger_1.logger.info(
            `Serial port ${this.config.path} opened at ${this.config.baudRate} baud`,
          );
          return resolve(void 0);
        }
      });
    });
  }
  async writeCommand(command) {
    return new Promise((resolve, reject) => {
      Logger_1.logger.info(`writeCommand ${command}`);
      this.port.write(`${command}\n`, err => {
        if (err) {
          Logger_1.logger.error(err);
          return reject(err);
        }
        setTimeout(() => {
          return resolve();
        }, 1000);
      });
    });
  }
  async readCommand(command) {
    return new Promise((resolve, reject) => {
      Logger_1.logger.info(`readCommand ${command}`);
      this.port.write(`${command}\n`, err => {
        if (err) {
          Logger_1.logger.error(err);
          return reject(err);
        }
        this.parser.once('data', data => {
          resolve(data.trim());
        });
      });
    });
  }
  async close() {
    this.port.close(function (err) {
      if (err) {
        return Logger_1.logger.error('Error: ', err.message);
      }
      Logger_1.logger.info('port closed');
    });
  }
}
exports.OwonConnectLibrary = OwonConnectLibrary;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3dvbkNvbm5lY3RMaWJyYXJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYnJhcmllcy9Pd29uQ29ubmVjdExpYnJhcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsMkNBQXdEO0FBR3hELDRDQUF5QztBQUU1QixRQUFBLHdCQUF3QixHQUNuQztJQUNFLElBQUksRUFBRSx3QkFBd0I7SUFDOUIsUUFBUSxFQUFFLE1BQU07SUFDaEIsUUFBUSxFQUFFLENBQUM7SUFDWCxNQUFNLEVBQUUsTUFBTTtDQUNmLENBQUM7QUFFSixNQUFhLGtCQUFrQjtJQU83QixZQUFZLElBQVksRUFBRSxNQUErQztRQUN2RSxJQUFJLENBQUMsSUFBSTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUUvQyxJQUFJLENBQUMsTUFBTSxpREFDTixnQ0FBd0IsR0FDeEIsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsR0FDZCxFQUFFLElBQUksRUFBRSxDQUNaLENBQUM7SUFDSixDQUFDO0lBRU0sS0FBSyxDQUFDLElBQUk7UUFDZixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSx1QkFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBVSxHQUFHO2dCQUNuRCxJQUFJLEdBQUcsRUFBRTtvQkFDUCxlQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3JDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDYjtZQUNILENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLDJCQUFjLEVBQUUsQ0FBQyxDQUFDO1lBRW5ELElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFVLEdBQUc7Z0JBQ25DLGVBQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMsR0FBRyxFQUFDLEVBQUU7Z0JBQy9CLElBQUksR0FBRyxFQUFFO29CQUNQLGVBQU0sQ0FBQyxLQUFLLENBQUMsNEJBQTRCLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ2hELE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDYjtxQkFBTTtvQkFDTCxlQUFNLENBQUMsSUFBSSxDQUNULGVBQWUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLGNBQWMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLE9BQU8sQ0FDekUsQ0FBQztvQkFDRixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2lCQUN4QjtZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFlO1FBQ3ZDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsZUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFO2dCQUNwQyxJQUFJLEdBQUcsRUFBRTtvQkFDUCxlQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNsQixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDcEI7Z0JBQ0QsVUFBVSxDQUFDLEdBQUcsRUFBRTtvQkFDZCxPQUFPLE9BQU8sRUFBRSxDQUFDO2dCQUNuQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDWCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBZTtRQUN0QyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLGVBQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUU7Z0JBQ3BDLElBQUksR0FBRyxFQUFFO29CQUNQLGVBQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2xCLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNwQjtnQkFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUU7b0JBQzlCLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDdkIsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLEtBQUssQ0FBQyxLQUFLO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRztZQUMzQixJQUFJLEdBQUcsRUFBRTtnQkFDUCxPQUFPLGVBQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUM3QztZQUNELGVBQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFwRkQsZ0RBb0ZDIn0=
