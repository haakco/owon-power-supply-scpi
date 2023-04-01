import { AutoDetectTypes } from '@serialport/bindings-cpp';
import { SerialPortOpenOptions } from 'serialport/dist/serialport';
export declare class OwonCommandLibrary {
  private owonConLib;
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
  measureVoltage(): Promise<string>;
  setVoltage(voltage: number): Promise<void>;
  setVoltageLimit(voltage: number): Promise<void>;
  getVoltage(): Promise<string>;
  getVoltageLimit(): Promise<string>;
  measureCurrent(): Promise<string>;
  setCurrent(voltage: number): Promise<void>;
  setCurrentLimit(voltage: number): Promise<void>;
  getCurrent(): Promise<string>;
  getCurrentLimit(): Promise<string>;
  measureAll(): Promise<string>;
  measureAllInfo(): Promise<string>;
  measurePower(): Promise<string>;
  init(): Promise<void>;
}
