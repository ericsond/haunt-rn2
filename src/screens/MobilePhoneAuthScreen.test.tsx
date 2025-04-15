tsx
import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import MobilePhoneAuthScreen from './MobilePhoneAuthScreen';

describe('MobilePhoneAuthScreen', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<MobilePhoneAuthScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('displays the text "MobilePhoneAuthScreen"', () => {
    const tree = renderer.create(<MobilePhoneAuthScreen />);
    const instance = tree.root;
    const textComponent = instance.findByProps({testID: "authScreenText"}).children[0];
    expect(textComponent).toEqual('MobilePhoneAuthScreen');
  });
});