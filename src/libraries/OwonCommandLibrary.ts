import { AutoDetectTypes } from '@serialport/bindings-cpp';
import { SerialPortOpenOptions } from 'serialport/dist/serialport';

import { EnumSCPICommands } from '../enums';

import { OwonConnectLibrary } from './OwonConnectLibrary';

export class OwonCommandLibrary {
  private owonConnect: OwonConnectLibrary;

  constructor(path: string, config?: SerialPortOpenOptions<AutoDetectTypes>) {
    this.owonConnect = new OwonConnectLibrary(path, config);
  }

  async init(): Promise<void> {
    await this.owonConnect.open();
    await this.reset();
    await this.setRemote();
    await this.setOutputOff();
  }

  public async close(): Promise<void> {
    await this.reset();
    await this.setRemote();
    await this.setOutputOff();
    await this.owonConnect.close();
  }

  async build(
    path: string,
    config?: SerialPortOpenOptions<AutoDetectTypes>,
  ): Promise<OwonCommandLibrary> {
    const owonCommandLibrary = new OwonCommandLibrary(path, config);
    await owonCommandLibrary.init();
    return owonCommandLibrary;
  }

  public async reset(): Promise<void> {
    await this.owonConnect.writeCommand(EnumSCPICommands.RESET);
  }

  public async setRemote(): Promise<void> {
    await this.owonConnect.writeCommand(EnumSCPICommands.REMOTE);
  }

  public async setLocal(): Promise<void> {
    await this.owonConnect.writeCommand(EnumSCPICommands.LOCAL);
  }

  public async setOutputOn(): Promise<void> {
    await this.owonConnect.writeCommand(EnumSCPICommands.SET_OUTPUT_ON);
  }

  public async setOutputOff(): Promise<void> {
    await this.owonConnect.writeCommand(EnumSCPICommands.SET_OUTPUT_OFF);
  }

  public async getOutput(): Promise<string> {
    return await this.owonConnect.readCommand(EnumSCPICommands.GET_OUTPUT);
  }

  public async getId(): Promise<string> {
    return await this.owonConnect.readCommand(EnumSCPICommands.GET_ID);
  }

  public async measureVoltage(): Promise<string> {
    return await this.owonConnect.readCommand(EnumSCPICommands.MEASURE_VOLTAGE);
  }

  public async setVoltage(voltage: number): Promise<void> {
    await this.owonConnect.writeCommand(
      `${EnumSCPICommands.SET_VOLTAGE} ${voltage}`,
    );
  }

  public async setVoltageLimit(voltage: number): Promise<void> {
    await this.owonConnect.writeCommand(
      `${EnumSCPICommands.SET_VOLTAGE_LIMIT} ${voltage}`,
    );
  }

  public async getVoltage(): Promise<string> {
    return await this.owonConnect.readCommand(EnumSCPICommands.GET_VOLTAGE);
  }

  public async getVoltageLimit(): Promise<string> {
    return await this.owonConnect.readCommand(
      EnumSCPICommands.GET_VOLTAGE_LIMIT,
    );
  }

  public async measureCurrent(): Promise<string> {
    return await this.owonConnect.readCommand(EnumSCPICommands.MEASURE_CURRENT);
  }

  public async setCurrent(voltage: number): Promise<void> {
    await this.owonConnect.writeCommand(
      `${EnumSCPICommands.SET_CURRENT} ${voltage}`,
    );
  }

  public async setCurrentLimit(voltage: number): Promise<void> {
    await this.owonConnect.writeCommand(
      `${EnumSCPICommands.SET_CURRENT_LIMIT} ${voltage}`,
    );
  }

  public async getCurrent(): Promise<string> {
    return await this.owonConnect.readCommand(EnumSCPICommands.GET_CURRENT);
  }

  public async getCurrentLimit(): Promise<string> {
    return await this.owonConnect.readCommand(
      EnumSCPICommands.GET_CURRENT_LIMIT,
    );
  }

  public async measureAll(): Promise<string> {
    return await this.owonConnect.readCommand(EnumSCPICommands.MEASURE_ALL);
  }

  public async measureAllInfo(): Promise<string> {
    return await this.owonConnect.readCommand(
      EnumSCPICommands.MEASURE_ALL_INFO,
    );
  }

  public async measurePower(): Promise<string> {
    return await this.owonConnect.readCommand(EnumSCPICommands.MEASURE_POWER);
  }
}
