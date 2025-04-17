// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));

// Mock @react-navigation/native
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
}));

// Mock @react-navigation/stack
jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: () => ({
    Navigator: jest.fn().mockReturnValue(null),
    Screen: jest.fn().mockReturnValue(null),
  }),
}));

// Mock @react-navigation/bottom-tabs
jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: () => ({
    Navigator: jest.fn().mockReturnValue(null),
    Screen: jest.fn().mockReturnValue(null),
  }),
}));

// Mock react-native-background-geolocation
jest.mock('react-native-background-geolocation', () => {
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

// Mock react-native
jest.mock('react-native', () => ({
  Platform: {
    OS: 'ios',
    select: jest.fn(obj => obj.ios),
  },
  StyleSheet: {
    create: jest.fn(styles => styles),
    flatten: jest.fn(style => style),
  },
  View: 'View',
  Text: 'Text',
  TouchableOpacity: 'TouchableOpacity',
  TextInput: 'TextInput',
  Alert: {
    alert: jest.fn(),
  },
  Button: 'Button',
  ScrollView: 'ScrollView',
}));
