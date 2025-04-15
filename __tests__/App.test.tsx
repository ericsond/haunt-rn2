/**
 * @format
 */

import React from 'react';
import { render, screen } from './test-utils';
import App from '../App';

// Mock navigation container
jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock stack navigator
jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: () => ({
    Navigator: ({ children }: { children: React.ReactNode }) => children,
    Screen: ({ component: Component, ...props }: any) => <Component {...props} />,
  }),
}));

// Mock tab navigator
jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: () => ({
    Navigator: ({ children }: { children: React.ReactNode }) => children,
    Screen: ({ component: Component, ...props }: any) => <Component {...props} />,
  }),
}));

describe('App', () => {
  it('renders correctly', () => {
    render(<App />);
    expect(screen.getByTestId('mobile-phone-auth-title')).toBeTruthy();
  });
});
