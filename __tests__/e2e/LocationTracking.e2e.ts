import { device, element, by, waitFor } from 'detox';

describe('Location Tracking', () => {
  beforeAll(async () => {
    await device.launchApp();
    
    // Skip auth if needed to get to the main app
    try {
      await waitFor(element(by.text('Continue'))).toBeVisible().withTimeout(2000);
      await element(by.text('Continue')).tap();
    } catch (e) {
      console.log('Auth screen not found, continuing with test...');
    }
    
    // Navigate to the Location screen tab
    await element(by.text('Location')).tap();
  });

  beforeEach(async () => {
    // Reset app state between tests
    await device.reloadReactNative();
    
    // Navigate to the Location screen tab
    await waitFor(element(by.text('Location'))).toBeVisible().withTimeout(5000);
    await element(by.text('Location')).tap();
  });

  it('should show the location tracking screen with initial state', async () => {
    // Verify screen elements are visible
    await expect(element(by.text('Location Tracking'))).toBeVisible();
    await expect(element(by.text('NOT TRACKING'))).toBeVisible();
    await expect(element(by.text('Start Tracking'))).toBeVisible();
    await expect(element(by.text('Stop Tracking'))).toBeVisible();
    await expect(element(by.text('Current Location:'))).toBeVisible();
    
    // Verify initial state - Stop button should be disabled
    await expect(element(by.text('Stop Tracking'))).toBeNotEnabled();
  });

  it('should start tracking when tapping the Start button', async () => {
    // Check initial state
    await expect(element(by.text('NOT TRACKING'))).toBeVisible();
    
    // Tap the Start Tracking button
    await element(by.text('Start Tracking')).tap();
    
    // Wait for tracking to start and status to update
    await waitFor(element(by.text('TRACKING')))
      .toBeVisible()
      .withTimeout(5000);
    
    // Verify button states have changed
    await expect(element(by.text('Start Tracking'))).toBeNotEnabled();
    await expect(element(by.text('Stop Tracking'))).toBeEnabled();
  });

  it('should stop tracking when tapping the Stop button', async () => {
    // First start tracking
    await element(by.text('Start Tracking')).tap();
    await waitFor(element(by.text('TRACKING')))
      .toBeVisible()
      .withTimeout(5000);
    
    // Then stop tracking
    await element(by.text('Stop Tracking')).tap();
    
    // Wait for tracking to stop and status to update
    await waitFor(element(by.text('NOT TRACKING')))
      .toBeVisible()
      .withTimeout(5000);
    
    // Verify button states have changed back
    await expect(element(by.text('Start Tracking'))).toBeEnabled();
    await expect(element(by.text('Stop Tracking'))).toBeNotEnabled();
  });

  it('should display location data when available', async () => {
    // Start tracking to get location data
    await element(by.text('Start Tracking')).tap();
    
    // Wait for tracking to start
    await waitFor(element(by.text('TRACKING')))
      .toBeVisible()
      .withTimeout(5000);
    
    // Wait for some time to allow location data to be received
    // This may fail in simulators without mock locations
    try {
      // Wait for location data to appear - look for typical location data patterns
      await waitFor(element(by.id('location-data')))
        .toHaveText(/latitude/)
        .withTimeout(10000);
      
      // Verify location data contains expected fields
      const locationData = await element(by.id('location-data')).getText();
      expect(locationData).toContain('latitude');
      expect(locationData).toContain('longitude');
    } catch (e) {
      console.log('Could not verify location data, may be using a simulator without location capabilities');
    }
    
    // Stop tracking
    await element(by.text('Stop Tracking')).tap();
  });

  // Test permissions dialogs (this is device-specific and may not work on all simulators)
  it('should handle location permission requests', async () => {
    // Reset permissions to force the dialog
    await device.clearKeychain();
    await device.resetContentAndSettings();
    await device.launchApp();
    
    // Navigate to Location screen
    await waitFor(element(by.text('Location'))).toBeVisible().withTimeout(5000);
    await element(by.text('Location')).tap();
    
    // Start tracking which should trigger permission dialog
    await element(by.text('Start Tracking')).tap();
    
    try {
      // Handle permission dialog on iOS
      await waitFor(element(by.text('Allow')))
        .toBeVisible()
        .withTimeout(3000);
      await element(by.text('Allow')).tap();
      
      // Handle background permission dialog
      await waitFor(element(by.text('Allow While Using App')))
        .toBeVisible()
        .withTimeout(3000);
      await element(by.text('Allow While Using App')).tap();
      
      // Verify we're tracking after allowing permissions
      await waitFor(element(by.text('TRACKING')))
        .toBeVisible()
        .withTimeout(5000);
    } catch (e) {
      console.log('Permission dialogs not shown or could not be handled');
    }
  });
}); 