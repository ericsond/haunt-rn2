import {device, element, by, expect} from 'detox';

describe('Haunt', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  afterAll(async () => {
    await device.terminateApp();
  });

  it('Should see the MobilePhoneAuthScreen', async () => {
    await expect(element(by.id('mobile-phone-auth-title'))).toBeVisible();
  });
});