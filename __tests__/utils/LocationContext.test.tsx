import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text, View } from 'react-native';
import { LocationProvider, useLocation } from '../../src/utils/LocationContext';
import LocationService from '../../src/utils/LocationService';

// Mock LocationService
jest.mock('../../src/utils/LocationService', () => ({
  configure: jest.fn().mockResolvedValue({ enabled: false }),
  registerLocationEvents: jest.fn(),
  unregisterLocationEvents: jest.fn(),
  start: jest.fn().mockResolvedValue({ enabled: true }),
  stop: jest.fn().mockResolvedValue({ enabled: false }),
  getState: jest.fn().mockResolvedValue({ enabled: false }),
  cleanup: jest.fn().mockResolvedValue(undefined),
}));

// Test component that uses the location hook
const TestComponent = ({ onMount = () => {} }) => {
  const { 
    currentLocation, 
    locationError, 
    isTracking,
    startTracking, 
    stopTracking 
  } = useLocation();

  React.useEffect(() => {
    onMount({
      currentLocation, 
      locationError, 
      isTracking,
      startTracking, 
      stopTracking
    });
  }, [onMount, currentLocation, locationError, isTracking]);
  
  return (
    <View>
      <Text testID="tracking-status">{isTracking ? 'tracking' : 'not-tracking'}</Text>
      <Text testID="location-data">
        {currentLocation ? JSON.stringify(currentLocation.coords) : 'no-data'}
      </Text>
      <Text testID="error-message">{locationError || 'no-error'}</Text>
      <Text testID="start-button" onPress={startTracking}>Start</Text>
      <Text testID="stop-button" onPress={stopTracking}>Stop</Text>
    </View>
  );
};

describe('LocationContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize LocationService and register events on mount', async () => {
    render(
      <LocationProvider>
        <TestComponent />
      </LocationProvider>
    );
    
    // Check that the service was initialized
    expect(LocationService.configure).toHaveBeenCalled();
    expect(LocationService.registerLocationEvents).toHaveBeenCalled();
    expect(LocationService.getState).toHaveBeenCalled();
  });

  it('should call cleanup on unmount', () => {
    const { unmount } = render(
      <LocationProvider>
        <TestComponent />
      </LocationProvider>
    );
    
    // Unmount the component
    unmount();
    
    // Verify cleanup
    expect(LocationService.cleanup).toHaveBeenCalled();
  });

  it('should start tracking when startTracking is called', async () => {
    let hookValues: any = {};
    const onMount = (values: any) => {
      hookValues = values;
    };
    
    render(
      <LocationProvider>
        <TestComponent onMount={onMount} />
      </LocationProvider>
    );
    
    // Call startTracking
    await hookValues.startTracking();
    
    // Verify start was called
    expect(LocationService.start).toHaveBeenCalled();
  });

  it('should stop tracking when stopTracking is called', async () => {
    let hookValues: any = {};
    const onMount = (values: any) => {
      hookValues = values;
    };
    
    render(
      <LocationProvider>
        <TestComponent onMount={onMount} />
      </LocationProvider>
    );
    
    // Call stopTracking
    await hookValues.stopTracking();
    
    // Verify stop was called
    expect(LocationService.stop).toHaveBeenCalled();
  });

  it('should update location when location event is triggered', () => {
    // Set up the callback capture
    let locationCallback: Function | null = null;
    (LocationService.registerLocationEvents as jest.Mock).mockImplementation((onLocation) => {
      locationCallback = onLocation;
    });
    
    // Render with the provider
    const { getByTestId } = render(
      <LocationProvider>
        <TestComponent />
      </LocationProvider>
    );
    
    // Make sure the registration happened
    expect(LocationService.registerLocationEvents).toHaveBeenCalled();
    
    // Initial state should show no data
    expect(getByTestId('location-data').props.children).toBe('no-data');
    
    // Simulate a location update
    const mockLocation = {
      coords: {
        latitude: 37.33233141,
        longitude: -122.0312186,
      },
      timestamp: 123456789,
    };
    
    // Call the captured callback
    if (locationCallback) {
      locationCallback(mockLocation);
    }
    
    // Check that location was updated
    expect(getByTestId('location-data').props.children).toContain('37.33233141');
    expect(getByTestId('location-data').props.children).toContain('-122.0312186');
  });

  it('should update error when error event is triggered', () => {
    // Set up the callback capture
    let errorCallback: Function | null = null;
    (LocationService.registerLocationEvents as jest.Mock).mockImplementation((_, onError) => {
      errorCallback = onError;
    });
    
    // Render with the provider
    const { getByTestId } = render(
      <LocationProvider>
        <TestComponent />
      </LocationProvider>
    );
    
    // Make sure the registration happened
    expect(LocationService.registerLocationEvents).toHaveBeenCalled();
    
    // Initial state should show no error
    expect(getByTestId('error-message').props.children).toBe('no-error');
    
    // Simulate an error
    const mockError = {
      code: 2,
      message: 'Location permission denied',
    };
    
    // Call the captured callback
    if (errorCallback) {
      errorCallback(mockError);
    }
    
    // Check that error was updated
    const errorMessage = getByTestId('error-message').props.children;
    expect(errorMessage).toContain('Location error');
    expect(errorMessage).toContain('2');
    expect(errorMessage).toContain('Location permission denied');
  });
}); 