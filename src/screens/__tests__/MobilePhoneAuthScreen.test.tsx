import React from 'react';
import { render, screen } from '@testing-library/react-native';
import MobilePhoneAuthScreen from '../MobilePhoneAuthScreen';

describe('MobilePhoneAuthScreen', () => {
  it('renders correctly', () => {
    render(<MobilePhoneAuthScreen />);
    expect(screen.getByText('MobilePhoneAuthScreen')).toBeTruthy();
  });
}); 