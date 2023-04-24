import { AutoDetectTypes } from '@serialport/bindings-cpp';
import { SerialPortOpenOptions } from 'serialport/dist/serialport';
export declare class OwonCommandLibrary {
  private owonConLib;
  private readonly config;
  constructor(path: string, config?: SerialPortOpenOptions<AutoDetectTypes>);
  static build(
    path: string,
    config?: SerialPortOpenOptions<AutoDetectTypes>,
  ): Promise<OwonCommandLibrary>;
  close(): Promise<void>;
  reset(): Promise<void>;
  setRemote(): Promise<void>;
  setLocal(): Promise<void>;
  setOutputOn(): Promise<void>;
  setOutputOff(): Promise<void>;
  getOutput(): Promise<string>;
  getId(): Promise<string>;
  setVoltage(voltage: number): Promise<void>;
  setVoltageLimit(voltage: number): Promise<void>;
  getVoltage(): Promise<string>;
  getVoltageLimit(): Promise<string>;
  measureVoltage(): Promise<string>;
  setCurrent(current: number): Promise<void>;
  setCurrentLimit(current: number): Promise<void>;
  getCurrent(): Promise<string>;
  getCurrentLimit(): Promise<string>;
  measureCurrent(): Promise<string>;
  measureAll(): Promise<string>;
  measureAllInfo(): Promise<string>;
  measurePower(): Promise<string>;
  init(): Promise<void>;
}
