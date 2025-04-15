import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CreateScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text testID="create-screen-title">CreateScreen</Text>
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

export default CreateScreen;