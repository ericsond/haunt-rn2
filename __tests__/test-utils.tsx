import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text } from 'react-native';

// Mock navigation container to avoid native dependencies
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    NavigationContainer: ({ children }: { children: React.ReactNode }) => children,
  };
});

// Custom render function that includes necessary providers
const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, {
    wrapper: ({ children }) => (
      <SafeAreaProvider>
        <NavigationContainer>{children}</NavigationContainer>
      </SafeAreaProvider>
    ),
    ...options,
  });

// Re-export everything from @testing-library/react-native
export * from '@testing-library/react-native';

// Override render method
export { customRender as render };

// Test the custom render function
describe('customRender', () => {
  it('renders components with navigation and safe area context', () => {
    const { getByText } = customRender(<Text>Test Content</Text>);
    expect(getByText('Test Content')).toBeTruthy();
  });
}); 