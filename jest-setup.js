// Import built-in matchers from react-native-testing-library
import '@testing-library/react-native';

// Setup handlers
import 'react-native-gesture-handler/jestSetup';

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Clear all mocks after each test
afterEach(() => {
  jest.clearAllMocks();
});

// Throw on console warnings and errors
const originalWarn = console.warn;
const originalError = console.error;

console.warn = (...args) => {
  originalWarn.apply(console, args);
  throw new Error(args.join(' '));
};

console.error = (...args) => {
  originalError.apply(console, args);
  throw new Error(args.join(' '));
};

console.log('Jest setup file');