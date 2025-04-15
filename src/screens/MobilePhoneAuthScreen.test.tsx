import React from 'react';
import { render, screen } from '@testing-library/react-native';
import MobilePhoneAuthScreen from './MobilePhoneAuthScreen';

describe('MobilePhoneAuthScreen', () => {
  it('renders correctly', () => {
    render(<MobilePhoneAuthScreen />);
    const title = screen.getByTestId('mobile-phone-auth-title');
    expect(title).toBeTruthy();
  });

  it('displays the text "MobilePhoneAuthScreen"', () => {
    render(<MobilePhoneAuthScreen />);
    const title = screen.getByTestId('mobile-phone-auth-title');
    expect(title.props.children).toBe('MobilePhoneAuthScreen');
  });
});