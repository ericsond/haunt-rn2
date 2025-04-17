import BackgroundGeolocation, {
  Location,
  Subscription,
  Config,
  State,
  LocationError
} from 'react-native-background-geolocation';

class LocationService {
  private static instance: LocationService;
  private onLocationSubscription?: Subscription;
  private onErrorSubscription?: Subscription;
  private isConfigured: boolean = false;

  private constructor() {
    // Private constructor for singleton
  }

  /**
   * Get singleton instance of LocationService
   */
  public static getInstance(): LocationService {
    if (!LocationService.instance) {
      LocationService.instance = new LocationService();
    }
    return LocationService.instance;
  }

  /**
   * Configure and start the background geolocation service
   */
  public async configure(config: Partial<Config> = {}): Promise<State> {
    if (this.isConfigured) {
      return await BackgroundGeolocation.getState();
    }
    
    // Default configuration
    const defaultConfig: Config = {
      // Debug config
      debug: __DEV__, // Show debug logs only when in development
      logLevel: __DEV__ ? BackgroundGeolocation.LOG_LEVEL_VERBOSE : BackgroundGeolocation.LOG_LEVEL_OFF,
      
      // Tracking config
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 10, // meters
      stopOnTerminate: false,
      startOnBoot: true,
      enableHeadless: true,
      
      // Activity Recognition
      stopTimeout: 5, // Minutes
      
      // Application config
      preventSuspend: false,
      heartbeatInterval: 60, // Seconds
      
      // iOS specific
      locationAuthorizationRequest: 'Always',
    };

    // Apply custom configuration
    const mergedConfig = {...defaultConfig, ...config};
    
    // Configure the plugin
    const state = await BackgroundGeolocation.ready(mergedConfig);
    this.isConfigured = true;
    
    return state;
  }
  
  /**
   * Register location change events
   */
  public registerLocationEvents(
    onLocation: (location: Location) => void,
    onError: (error: LocationError) => void
  ): void {
    // Unregister existing events first
    this.unregisterLocationEvents();
    
    // Register for location events
    this.onLocationSubscription = BackgroundGeolocation.onLocation(onLocation);
    
    // Register for error events
    this.onErrorSubscription = BackgroundGeolocation.onError(onError);
  }
  
  /**
   * Unregister location events
   */
  public unregisterLocationEvents(): void {
    if (this.onLocationSubscription) {
      this.onLocationSubscription.remove();
      this.onLocationSubscription = undefined;
    }
    
    if (this.onErrorSubscription) {
      this.onErrorSubscription.remove();
      this.onErrorSubscription = undefined;
    }
  }
  
  /**
   * Start tracking location
   */
  public async start(): Promise<State> {
    if (!this.isConfigured) {
      await this.configure();
    }
    return await BackgroundGeolocation.start();
  }
  
  /**
   * Stop tracking location
   */
  public async stop(): Promise<State> {
    return await BackgroundGeolocation.stop();
  }
  
  /**
   * Get the current state of the service
   */
  public async getState(): Promise<State> {
    return await BackgroundGeolocation.getState();
  }
  
  /**
   * Clean up resources
   */
  public async cleanup(): Promise<void> {
    this.unregisterLocationEvents();
    await BackgroundGeolocation.stop();
  }
}

export default LocationService.getInstance(); 