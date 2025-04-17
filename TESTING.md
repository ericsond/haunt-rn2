# Testing for Location Tracking Feature

This document describes how to run tests for the location tracking feature in the Haunt app.

## Test Overview

The location tracking feature tests are organized into three levels:

1. **Unit Tests** - Tests for individual components:
   - `LocationService.test.ts` - Tests the service that wraps react-native-background-geolocation
   - `LocationContext.test.tsx` - Tests the React context that provides location data to the app
   - `LocationScreen.test.tsx` - Tests the UI component for displaying location data

2. **Integration Tests** - Tests for multiple components working together:
   - `LocationFeature.test.ts` - Runs all location-related tests as a group

3. **End-to-End Tests** - Tests the full app experience:
   - `LocationTracking.e2e.ts` - Tests the complete user flow for location tracking

## Running Unit and Integration Tests

Run the following command to execute all unit and integration tests:

```bash
npm test
```

To run a specific test file:

```bash
npm test -- __tests__/utils/LocationService.test.ts
```

## Running End-to-End Tests

End-to-end tests require a simulator/emulator to be available.

### iOS

1. Build the app for E2E testing:
```bash
npm run test:e2e:build
```

2. Run the E2E tests:
```bash
npm run test:e2e
```

### Android

1. Make sure an Android emulator is running

2. Build the app for E2E testing:
```bash
npm run test:e2e:android:build
```

3. Run the E2E tests:
```bash
npm run test:e2e:android
```

## Mocking Location in Simulators

### iOS Simulator

1. In the simulator, go to **Features → Location** and select one of the simulated locations or custom location.

2. Alternatively, you can use Xcode's simulation features by selecting **Debug → Simulate Location** when running the app through Xcode.

### Android Emulator

1. In the emulator, go to the **Extended Controls** (three dots) → **Location** tab.

2. Enter coordinates or select a predefined location.

## Current Test Status and Known Issues

The current test suite has some failing tests that need to be addressed:

1. **Dependencies Issues**: The tests for `LocationContext` use React hooks which need to be properly mocked and wrapped in `act()`. Currently, there are some async state updates that aren't wrapped correctly.

2. **React Testing Compatibility**: Our React 19 environment has compatibility issues with certain testing libraries. We'll need to update our approach to use the latest recommended testing patterns.

3. **UI Testing Issues**: The screen tests have assertions about the disabled state of buttons, but our current implementation isn't properly communicating this state to the test renderer.

## Next Steps for Fixing Tests

1. Update `LocationService.test.ts` to better match the actual implementation of the service.

2. Revise `LocationContext.test.tsx` to properly handle async operations and React state updates with `act()`.

3. Update `LocationScreen.test.tsx` to match the actual implementation of the UI components, particularly around button states.

4. Create proper mocks for React Native components to ensure they work correctly in tests.

5. Use Jest's `spyOn` instead of direct mock replacements for more accurate testing.

## Troubleshooting Tests

### Common Issues

1. **Permissions Dialogs**: E2E tests may fail if permission dialogs appear unexpectedly. The test includes handlers for common permission dialogs, but you may need to adjust them based on your environment.

2. **Missing Location Data**: Tests checking for location data may fail in simulators without mock locations configured. Set up mock locations before running these tests.

3. **Test Timeouts**: Location operations may take time, especially on slower simulators. Consider increasing timeouts in `LocationTracking.e2e.ts` if tests fail due to timing issues.

4. **Jest Configuration**: If tests fail with module resolution errors, check the `jest.config.js` and `jest.setup.js` files to ensure all required mocks are properly configured.

### Debugging Unit Tests

Add the `--verbose` flag to see more detailed output:

```bash
npm test -- --verbose
```

### Debugging E2E Tests

Detox has several useful flags for debugging:

```bash
npm run test:e2e -- --debug
```

This will run the tests with more verbose logging and slower execution to help identify issues. 