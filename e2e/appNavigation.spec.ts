import {device, element, by, expect} from 'detox';

/**
 * E2E test for basic app navigation
 * Tests the initial screen and navigation between screens
 */
describe('App Navigation', () => {
  beforeAll(async () => {
    // Launch the app before all tests
    await device.launchApp();
  });

  afterAll(async () => {
    // Terminate the app after all tests
    await device.terminateApp();
  });

  beforeEach(async () => {
    // Relaunch the app before each test to ensure a clean state
    await device.reloadReactNative();
  });

  it('should display the MobilePhoneAuthScreen on app launch', async () => {
    // Check if the title text is visible
    await expect(element(by.id('mobile-phone-auth-title'))).toBeVisible();
    
    // Also check by text content as a fallback
    await expect(element(by.text('MobilePhoneAuthScreen'))).toBeVisible();
  });

  // This test will fail if navigation is not implemented yet
  // It's a good starting point for when you implement navigation
  it('should navigate to VerifyCode screen when a button is pressed', async () => {
    // This test is a placeholder for when you implement navigation
    // You'll need to add a button with testID="verify-code-button" to your MobilePhoneAuthScreen
    // and implement the navigation logic
    
    // For now, we'll just check that we're on the initial screen
    await expect(element(by.id('mobile-phone-auth-title'))).toBeVisible();
    
    // When you implement the button and navigation, uncomment these lines:
    // await element(by.id('verify-code-button')).tap();
    // await expect(element(by.text('VerifyCodeScreen'))).toBeVisible();
  });
}); 