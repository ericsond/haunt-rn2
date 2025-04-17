import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { useLocation } from '../utils/LocationContext';

const LocationScreen: React.FC = () => {
  const { 
    currentLocation, 
    locationError, 
    isTracking,
    startTracking, 
    stopTracking 
  } = useLocation();

  // Format location for display
  const formatLocation = () => {
    if (!currentLocation) return 'No location data available';
    
    return JSON.stringify({
      coords: {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        altitude: currentLocation.coords.altitude,
        accuracy: currentLocation.coords.accuracy,
        speed: currentLocation.coords.speed,
        heading: currentLocation.coords.heading,
      },
      timestamp: new Date(currentLocation.timestamp).toLocaleString(),
      odometer: currentLocation.odometer,
      activity: currentLocation.activity?.type,
      battery: {
        level: currentLocation.battery?.level,
        isCharging: currentLocation.battery?.is_charging,
      }
    }, null, 2);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} testID="location-screen-title">Location Tracking</Text>
      
      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Status:</Text>
        <Text style={[
          styles.statusValue, 
          isTracking ? styles.statusActive : styles.statusInactive
        ]}>
          {isTracking ? 'TRACKING' : 'NOT TRACKING'}
        </Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Start Tracking"
          onPress={startTracking}
          disabled={isTracking}
          testID="start-tracking-button"
        />
        <View style={styles.buttonSpacer} />
        <Button
          title="Stop Tracking"
          onPress={stopTracking}
          disabled={!isTracking}
          color="#FF3B30"
          testID="stop-tracking-button"
        />
      </View>
      
      {locationError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{locationError}</Text>
        </View>
      )}
      
      <View style={styles.dataContainer}>
        <Text style={styles.dataLabel}>Current Location:</Text>
        <ScrollView style={styles.dataScrollView}>
          <Text style={styles.dataValue} testID="location-data">
            {formatLocation()}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  statusValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusActive: {
    color: '#4CD964',
  },
  statusInactive: {
    color: '#FF3B30',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  buttonSpacer: {
    width: 20,
  },
  errorContainer: {
    padding: 10,
    backgroundColor: '#FFEEEE',
    borderRadius: 5,
    marginBottom: 20,
  },
  errorText: {
    color: '#FF3B30',
  },
  dataContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  dataLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dataScrollView: {
    flex: 1,
  },
  dataValue: {
    fontFamily: 'Courier',
    fontSize: 14,
  },
});

export default LocationScreen; 