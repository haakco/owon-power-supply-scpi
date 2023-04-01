'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const ava_1 = __importDefault(require('ava'));
const enums_1 = require('../enums');
const OwonConnectLibrary_1 = require('./OwonConnectLibrary');
const port = '/dev/cu.usbserial-5410';
// ToDo: Need to add tests
(0, ava_1.default)('Test if we can connect', async t => {
  // Assert
  t.log('Setup');
  const owonConLib = new OwonConnectLibrary_1.OwonConnectLibrary(port);
  t.log('Opening port');
  await owonConLib.open();
  let response;
  t.log(await owonConLib.writeCommand(enums_1.EnumSCPICommands.RESET));
  response = await owonConLib.readCommand(enums_1.EnumSCPICommands.GET_ID);
  t.log(response);
  response = await owonConLib.readCommand(enums_1.EnumSCPICommands.GET_CURRENT);
  t.log(response);
  t.log('Closing port');
  // await owonConLib.close();
  t.deepEqual(3, 3);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3dvbkNvbm5lY3RMaWJyYXJ5LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGlicmFyaWVzL093b25Db25uZWN0TGlicmFyeS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOENBQXVCO0FBRXZCLG9DQUE0QztBQUU1Qyw2REFBMEQ7QUFFMUQsTUFBTSxJQUFJLEdBQUcsd0JBQXdCLENBQUM7QUFFdEMsMEJBQTBCO0FBQzFCLElBQUEsYUFBSSxFQUFDLHdCQUF3QixFQUFFLEtBQUssRUFBQyxDQUFDLEVBQUMsRUFBRTtJQUN2QyxTQUFTO0lBQ1QsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNmLE1BQU0sVUFBVSxHQUFHLElBQUksdUNBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEQsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUN0QixNQUFNLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixJQUFJLFFBQWdCLENBQUM7SUFDckIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLFVBQVUsQ0FBQyxZQUFZLENBQUMsd0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUM3RCxRQUFRLEdBQUcsTUFBTSxVQUFVLENBQUMsV0FBVyxDQUFDLHdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2pFLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEIsUUFBUSxHQUFHLE1BQU0sVUFBVSxDQUFDLFdBQVcsQ0FBQyx3QkFBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN0RSxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hCLENBQUMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDdEIsNEJBQTRCO0lBQzVCLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3BCLENBQUMsQ0FBQyxDQUFDIn0=
