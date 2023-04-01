import test from 'ava';

import { EnumSCPICommands } from '../enums';

import { OwonConnectLibrary } from './OwonConnectLibrary';

const port = '/dev/cu.usbserial-5410';

// ToDo: Need to add tests
test('Test if we can connect', async t => {
  // Assert
  t.log('Setup');
  const owonConLib = new OwonConnectLibrary(port);
  t.log('Opening port');
  await owonConLib.open();
  let response: string;
  t.log(await owonConLib.writeCommand(EnumSCPICommands.RESET));
  response = await owonConLib.readCommand(EnumSCPICommands.GET_ID);
  t.log(response);
  response = await owonConLib.readCommand(EnumSCPICommands.GET_CURRENT);
  t.log(response);
  t.log('Closing port');
  // await owonConLib.close();
  t.deepEqual(3, 3);
});
