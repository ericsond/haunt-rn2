import LocationService from '../../src/utils/LocationService';

// Mock the entire BackgroundGeolocation module
jest.mock('react-native-background-geolocation', () => {
  // Create mock implementations for all BackgroundGeolocation methods
  const mockSubscription = { remove: jest.fn() };
  
  return {
    LOG_LEVEL_VERBOSE: 5,
    LOG_LEVEL_OFF: 0,
    DESIRED_ACCURACY_HIGH: 4,
    ready: jest.fn().mockResolvedValue({ enabled: false }),
    getState: jest.fn().mockResolvedValue({ enabled: false }),
    start: jest.fn().mockResolvedValue({ enabled: true }),
    stop: jest.fn().mockResolvedValue({ enabled: false }),
    onLocation: jest.fn().mockReturnValue(mockSubscription),
    onError: jest.fn().mockReturnValue(mockSubscription),
  };
});

import BackgroundGeolocation from 'react-native-background-geolocation';

describe('LocationService', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  // Config tests
  describe('configure', () => {
    it('should configure BackgroundGeolocation with default settings', async () => {
      await LocationService.configure();
      
      // Verify BackgroundGeolocation.ready was called with expected config
      expect(BackgroundGeolocation.ready).toHaveBeenCalledWith(
        expect.objectContaining({
          desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
          distanceFilter: 10,
          stopOnTerminate: false,
          startOnBoot: true,
          enableHeadless: true,
        })
      );
    });

    it('should not configure twice if already configured', async () => {
      await LocationService.configure();
      await LocationService.configure();
      
      // Should only call ready once
      expect(BackgroundGeolocation.ready).toHaveBeenCalledTimes(1);
    });

    it('should apply custom config when provided', async () => {
      const customConfig = {
        distanceFilter: 50,
        debug: true,
      };
      
      await LocationService.configure(customConfig);
      
      expect(BackgroundGeolocation.ready).toHaveBeenCalledWith(
        expect.objectContaining(customConfig)
      );
    });
  });

  // Event registration tests
  describe('registerLocationEvents', () => {
    it('should register location and error event handlers', () => {
      const onLocation = jest.fn();
      const onError = jest.fn();
      
      LocationService.registerLocationEvents(onLocation, onError);
      
      expect(BackgroundGeolocation.onLocation).toHaveBeenCalledWith(onLocation);
      expect(BackgroundGeolocation.onError).toHaveBeenCalledWith(onError);
    });

    it('should unregister previous event handlers before registering new ones', () => {
      const mockSubscription = BackgroundGeolocation.onLocation(jest.fn());
      
      // Register handlers
      LocationService.registerLocationEvents(jest.fn(), jest.fn());
      
      // Register new handlers
      LocationService.registerLocationEvents(jest.fn(), jest.fn());
      
      // Should have called remove on the old subscription
      expect(mockSubscription.remove).toHaveBeenCalledTimes(2);
    });
  });

  // Start/stop tests
  describe('start/stop tracking', () => {
    it('should configure and start tracking', async () => {
      await LocationService.start();
      
      expect(BackgroundGeolocation.ready).toHaveBeenCalled();
      expect(BackgroundGeolocation.start).toHaveBeenCalled();
    });

    it('should stop tracking', async () => {
      await LocationService.stop();
      
      expect(BackgroundGeolocation.stop).toHaveBeenCalled();
    });
  });

  // Cleanup tests
  describe('cleanup', () => {
    it('should unregister events and stop tracking during cleanup', async () => {
      // Setup subscriptions
      LocationService.registerLocationEvents(jest.fn(), jest.fn());
      
      // Perform cleanup
      await LocationService.cleanup();
      
      const mockSubscription = BackgroundGeolocation.onLocation(jest.fn());
      expect(mockSubscription.remove).toHaveBeenCalled();
      expect(BackgroundGeolocation.stop).toHaveBeenCalled();
    });
  });
}); 