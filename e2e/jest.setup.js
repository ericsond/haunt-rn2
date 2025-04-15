const { device, init, installWorker } = require('detox');

beforeAll(async () => {
  await init();
  await installWorker();
  await device.launchApp({
    newInstance: true,
  });
});

afterAll(async () => {
  await device.terminateApp();
}); 