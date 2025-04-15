import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FriendsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text testID="friends-screen-title">FriendsScreen</Text>
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

export default FriendsScreen;