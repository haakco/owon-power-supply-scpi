import { AutoDetectTypes } from '@serialport/bindings-cpp';
import { ReadlineParser, SerialPort } from 'serialport';
import { SerialPortOpenOptions } from 'serialport/dist/serialport';

export const OwonLibraryDefaultConfig: SerialPortOpenOptions<AutoDetectTypes> =
  {
    path: '/dev/cu.usbserial-410',
    baudRate: 115200,
    dataBits: 8,
    parity: 'none',
  };

let port: SerialPort<AutoDetectTypes>;
let parser: ReadlineParser;

export class OwonConnectLibrary {
  private config: SerialPortOpenOptions<AutoDetectTypes>;
  // @ts-ignore: Needed for future
  private port: SerialPort<AutoDetectTypes>;
  // @ts-ignore: Needed for future
  private parser: ReadlineParser;

  constructor(path: string, config?: SerialPortOpenOptions<AutoDetectTypes>) {
    if (!path) throw new Error('Port is required');

    this.config = {
      ...OwonLibraryDefaultConfig,
      ...(config ?? {}),
      ...{ path },
    };
    this.port = new SerialPort(this.config);
    this.parser = port.pipe(new ReadlineParser());

    parser.on('error', function (err) {
      console.log('Error: ', err.message);
    });
  }

  async open(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.port = new SerialPort(this.config, err => {
        if (err) return reject(err);
      });
      this.parser = port.pipe(new ReadlineParser());
      parser.on('error', function (err) {
        console.log('Error: ', err.message);
      });

      port.on('open', async error => {
        if (error) {
          console.error('Error opening serial port:', error);
          reject(error);
        } else {
          console.log(
            `Serial port ${this.config.path} opened at ${this.config.baudRate} baud`,
          );
          return resolve(void 0);
        }
      });
    });
  }
  public async readCommand(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
      console.log(`readCommand ${command}`);
      port.write(`${command}\n`, err => {
        if (err) return reject(err);
        parser.once('data', data => {
          console.log(parser.listeners('data'));
          resolve(data);
        });
      });
    });
  }

  async writeCommand(command: string): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log(`writeCommand ${command}`);
      port.write(`${command}\n`, err => {
        if (err) return reject(err);
        setTimeout(() => {
          return resolve();
        }, 1000);
      });
    });
  }
  async close() {
    await port.close(function (err) {
      console.log('port closed', err);
    });
  }
}
