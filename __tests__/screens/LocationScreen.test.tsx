import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { render } from '../test-utils';
import LocationScreen from '../../src/screens/LocationScreen';
import { LocationProvider, useLocation } from '../../src/utils/LocationContext';

// Mock the useLocation hook
jest.mock('../../src/utils/LocationContext', () => {
  const originalModule = jest.requireActual('../../src/utils/LocationContext');
  
  return {
    ...originalModule,
    useLocation: jest.fn(),
  };
});

describe('LocationScreen', () => {
  // Default mock implementation
  const mockLocationContext = {
    currentLocation: null,
    locationError: null,
    isTracking: false,
    startTracking: jest.fn(),
    stopTracking: jest.fn(),
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
    // Set default mock implementation for useLocation
    (useLocation as jest.Mock).mockReturnValue(mockLocationContext);
  });
  
  it('renders correctly with initial state', () => {
    const { getByTestId, getByText } = render(<LocationScreen />);
    
    // Screen title should be present
    expect(getByTestId('location-screen-title')).toBeTruthy();
    
    // Status should show not tracking
    expect(getByText('NOT TRACKING')).toBeTruthy();
    
    // Start button should be enabled, stop button disabled
    const startButton = getByTestId('start-tracking-button');
    const stopButton = getByTestId('stop-tracking-button');
    
    expect(startButton).not.toBeDisabled();
    expect(stopButton).toBeDisabled();
    
    // Should show no location data message
    expect(getByTestId('location-data')).toHaveTextContent('No location data available');
  });
  
  it('shows tracking status when tracking is active', () => {
    // Mock tracking as active
    (useLocation as jest.Mock).mockReturnValue({
      ...mockLocationContext,
      isTracking: true,
    });
    
    const { getByText } = render(<LocationScreen />);
    
    // Status should show tracking
    expect(getByText('TRACKING')).toBeTruthy();
  });
  
  it('enables/disables buttons based on tracking state', () => {
    // Mock tracking as active
    (useLocation as jest.Mock).mockReturnValue({
      ...mockLocationContext,
      isTracking: true,
    });
    
    const { getByTestId } = render(<LocationScreen />);
    
    // Start button should be disabled, stop button enabled
    const startButton = getByTestId('start-tracking-button');
    const stopButton = getByTestId('stop-tracking-button');
    
    expect(startButton).toBeDisabled();
    expect(stopButton).not.toBeDisabled();
  });
  
  it('calls startTracking when start button is pressed', () => {
    const startTrackingMock = jest.fn();
    
    // Mock with custom startTracking function
    (useLocation as jest.Mock).mockReturnValue({
      ...mockLocationContext,
      startTracking: startTrackingMock,
    });
    
    const { getByTestId } = render(<LocationScreen />);
    
    // Press the start button
    const startButton = getByTestId('start-tracking-button');
    fireEvent.press(startButton);
    
    // Verify startTracking was called
    expect(startTrackingMock).toHaveBeenCalled();
  });
  
  it('calls stopTracking when stop button is pressed', () => {
    const stopTrackingMock = jest.fn();
    
    // Mock with active tracking and custom stopTracking function
    (useLocation as jest.Mock).mockReturnValue({
      ...mockLocationContext,
      isTracking: true,
      stopTracking: stopTrackingMock,
    });
    
    const { getByTestId } = render(<LocationScreen />);
    
    // Press the stop button
    const stopButton = getByTestId('stop-tracking-button');
    fireEvent.press(stopButton);
    
    // Verify stopTracking was called
    expect(stopTrackingMock).toHaveBeenCalled();
  });
  
  it('displays location data when available', () => {
    // Mock with location data
    const mockLocation = {
      coords: {
        latitude: 37.33233141,
        longitude: -122.0312186,
        accuracy: 10,
        speed: 0,
        heading: 0,
        altitude: 0,
      },
      timestamp: new Date(2023, 5, 15).getTime(),
      odometer: 1000,
      activity: { type: 'still' },
      battery: { level: 0.8, is_charging: false },
    };
    
    (useLocation as jest.Mock).mockReturnValue({
      ...mockLocationContext,
      currentLocation: mockLocation,
    });
    
    const { getByTestId } = render(<LocationScreen />);
    
    // Location data should be displayed
    const locationData = getByTestId('location-data');
    
    // Check that key location properties are displayed
    expect(locationData).toHaveTextContent('37.33233141');
    expect(locationData).toHaveTextContent('-122.0312186');
    expect(locationData).toHaveTextContent('still');
  });
  
  it('displays error message when location error occurs', () => {
    // Mock with location error
    const errorMessage = 'Location permission denied';
    
    (useLocation as jest.Mock).mockReturnValue({
      ...mockLocationContext,
      locationError: errorMessage,
    });
    
    const { getByText } = render(<LocationScreen />);
    
    // Error message should be displayed
    expect(getByText(errorMessage)).toBeTruthy();
  });
}); 