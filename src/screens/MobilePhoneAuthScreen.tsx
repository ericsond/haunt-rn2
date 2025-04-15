import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MobilePhoneAuthScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text testID="mobile-phone-auth-title">MobilePhoneAuthScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MobilePhoneAuthScreen;