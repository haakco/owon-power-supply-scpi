import { AutoDetectTypes } from '@serialport/bindings-cpp';
import { ReadlineParser, SerialPort } from 'serialport';
import { SerialPortOpenOptions } from 'serialport/dist/serialport';
export declare const OwonLibraryDefaultConfig: SerialPortOpenOptions<AutoDetectTypes>;
export declare class OwonConnectLibrary {
  port: SerialPort<AutoDetectTypes>;
  parser: ReadlineParser;
  config: SerialPortOpenOptions<AutoDetectTypes>;
  constructor(path: string, config?: SerialPortOpenOptions<AutoDetectTypes>);
  open(): Promise<void>;
  writeCommand(command: string): Promise<void>;
  readCommand(command: string): Promise<string>;
  close(): Promise<void>;
}
