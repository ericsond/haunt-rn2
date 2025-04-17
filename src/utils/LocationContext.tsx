import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Alert, Platform } from 'react-native';
import BackgroundGeolocation, { Location, State, LocationError } from 'react-native-background-geolocation';
import LocationService from './LocationService';

interface LocationContextType {
  currentLocation: Location | null;
  locationError: string | null;
  isTracking: boolean;
  startTracking: () => Promise<void>;
  stopTracking: () => Promise<void>;
}

// Create context with default values
const LocationContext = createContext<LocationContextType>({
  currentLocation: null,
  locationError: null,
  isTracking: false,
  startTracking: async () => {},
  stopTracking: async () => {},
});

// Custom hook to use the location context
export const useLocation = () => useContext(LocationContext);

interface LocationProviderProps {
  children: ReactNode;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isTracking, setIsTracking] = useState<boolean>(false);

  // Initialize background geolocation on component mount
  useEffect(() => {
    const initializeLocation = async () => {
      try {
        // Configure the location service
        await LocationService.configure();

        // Register for location events
        LocationService.registerLocationEvents(
          (location: Location) => {
            setCurrentLocation(location);
            setLocationError(null);
          },
          (error: LocationError) => {
            setLocationError(`Location error: ${error.code} - ${error.message}`);
            console.error('[LocationContext] Error:', error);
          }
        );

        // Check current state and update isTracking
        const state = await LocationService.getState();
        setIsTracking(state.enabled);
      } catch (error) {
        console.error('[LocationContext] Initialization error:', error);
        setLocationError('Failed to initialize location tracking');
      }
    };

    initializeLocation();

    // Clean up on unmount
    return () => {
      LocationService.cleanup();
    };
  }, []);

  // Start location tracking
  const startTracking = async (): Promise<void> => {
    try {
      if (!isTracking) {
        await LocationService.start();
        setIsTracking(true);
      }
    } catch (error) {
      console.error('[LocationContext] Start tracking error:', error);
      setLocationError('Failed to start location tracking');
    }
  };

  // Stop location tracking
  const stopTracking = async (): Promise<void> => {
    try {
      if (isTracking) {
        await LocationService.stop();
        setIsTracking(false);
      }
    } catch (error) {
      console.error('[LocationContext] Stop tracking error:', error);
      setLocationError('Failed to stop location tracking');
    }
  };

  // Context value
  const contextValue: LocationContextType = {
    currentLocation,
    locationError,
    isTracking,
    startTracking,
    stopTracking,
  };

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  );
}; 