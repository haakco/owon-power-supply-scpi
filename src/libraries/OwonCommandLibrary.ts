import { AutoDetectTypes } from '@serialport/bindings-cpp';
import { SerialPortOpenOptions } from 'serialport/dist/serialport';

import { EnumSCPICommands } from '../enums';

import {
  OwonConnectLibrary,
  OwonLibraryDefaultConfig,
} from './OwonConnectLibrary';

export class OwonCommandLibrary {
  private owonConLib: OwonConnectLibrary;
  private config: SerialPortOpenOptions<AutoDetectTypes>;

  public constructor(
    path: string,
    config?: SerialPortOpenOptions<AutoDetectTypes>,
  ) {
    this.config = config ?? OwonLibraryDefaultConfig;
    this.owonConLib = new OwonConnectLibrary(path, this.config);
  }

  public static async build(
    path: string,
    config?: SerialPortOpenOptions<AutoDetectTypes>,
  ): Promise<OwonCommandLibrary> {
    const owonCommandLibrary = new OwonCommandLibrary(path, config);
    await owonCommandLibrary.init();
    return owonCommandLibrary;
  }

  public async close(): Promise<void> {
    await this.setRemote();
    await this.setOutputOff();
    return this.owonConLib.close();
  }

  public async reset(): Promise<void> {
    await this.owonConLib.writeCommand(EnumSCPICommands.RESET);
    return;
  }

  public async setRemote(): Promise<void> {
    await this.owonConLib.writeCommand(EnumSCPICommands.REMOTE);
    return;
  }

  public async setLocal(): Promise<void> {
    await this.owonConLib.writeCommand(EnumSCPICommands.LOCAL);
    return;
  }

  public async setOutputOn(): Promise<void> {
    await this.owonConLib.writeCommand(EnumSCPICommands.SET_OUTPUT_ON);
    return;
  }

  public async setOutputOff(): Promise<void> {
    await this.owonConLib.writeCommand(EnumSCPICommands.SET_OUTPUT_OFF);
    return;
  }

  public async getOutput(): Promise<string> {
    return this.owonConLib.readCommand(EnumSCPICommands.GET_OUTPUT);
  }

  public async getId(): Promise<string> {
    return this.owonConLib.readCommand(EnumSCPICommands.GET_ID);
  }

  public async setVoltage(voltage: number): Promise<void> {
    await this.owonConLib.writeCommand(
      `${EnumSCPICommands.SET_VOLTAGE} ${voltage}`,
    );
    return;
  }

  public async setVoltageLimit(voltage: number): Promise<void> {
    await this.owonConLib.writeCommand(
      `${EnumSCPICommands.SET_VOLTAGE_LIMIT} ${voltage}`,
    );
    return;
  }

  public async getVoltage(): Promise<string> {
    return this.owonConLib.readCommand(EnumSCPICommands.GET_VOLTAGE);
  }

  public async getVoltageLimit(): Promise<string> {
    return this.owonConLib.readCommand(EnumSCPICommands.GET_VOLTAGE_LIMIT);
  }

  public async measureVoltage(): Promise<string> {
    return this.owonConLib.readCommand(EnumSCPICommands.MEASURE_VOLTAGE);
  }

  public async setCurrent(current: number): Promise<void> {
    await this.owonConLib.writeCommand(
      `${EnumSCPICommands.SET_CURRENT} ${current}`,
    );
    return;
  }

  public async setCurrentLimit(current: number): Promise<void> {
    await this.owonConLib.writeCommand(
      `${EnumSCPICommands.SET_CURRENT_LIMIT} ${current}`,
    );
    return;
  }

  public async getCurrent(): Promise<string> {
    return this.owonConLib.readCommand(EnumSCPICommands.GET_CURRENT);
  }

  public async getCurrentLimit(): Promise<string> {
    return this.owonConLib.readCommand(EnumSCPICommands.GET_CURRENT_LIMIT);
  }

  public async measureCurrent(): Promise<string> {
    return this.owonConLib.readCommand(EnumSCPICommands.MEASURE_CURRENT);
  }

  public async measureAll(): Promise<string> {
    return this.owonConLib.readCommand(EnumSCPICommands.MEASURE_ALL);
  }

  public async measureAllInfo(): Promise<string> {
    return this.owonConLib.readCommand(EnumSCPICommands.MEASURE_ALL_INFO);
  }

  public async measurePower(): Promise<string> {
    return this.owonConLib.readCommand(EnumSCPICommands.MEASURE_POWER);
  }

  public async init(): Promise<void> {
    await this.owonConLib.open();
    await this.setRemote();
    await this.setOutputOff();
    await this.setLocal();
    return;
  }
}
