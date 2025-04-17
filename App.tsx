/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Button, View, Text} from 'react-native';

import MobilePhoneAuthScreen from './src/screens/MobilePhoneAuthScreen';
import VerifyCodeScreen from './src/screens/VerifyCodeScreen';
import FeedScreen from './src/screens/FeedScreen';
import CreateScreen from './src/screens/CreateScreen';
import FriendsScreen from './src/screens/FriendsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import LocationScreen from './src/screens/LocationScreen';
import { LocationProvider } from './src/utils/LocationContext';

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

function createAuthStack() {
  return (
    <AuthStack.Navigator initialRouteName="MobilePhoneAuth">
      <AuthStack.Screen name="MobilePhoneAuth" component={MobilePhoneAuthScreen} />
      <AuthStack.Screen name="VerifyCode" component={VerifyCodeScreen} />
    </AuthStack.Navigator>
  );
}

function createMainTabs() {
  return (
    <MainTab.Navigator>
      <MainTab.Screen name="Feed" component={FeedScreen} />
      <MainTab.Screen name="Location" component={LocationScreen} />
      <MainTab.Screen name="Create" component={CreateScreen} />
      <MainTab.Screen name="Friends" component={FriendsScreen} />
      <MainTab.Screen name="Settings" component={SettingsScreen} />
    </MainTab.Navigator>
  );
}

const RootStack = createStackNavigator();

function App(): React.JSX.Element {  
  return (
    <LocationProvider>
      <NavigationContainer>
        <RootStack.Navigator 
          initialRouteName="Auth"
          screenOptions={{
            headerShown: false, // Hide header for all screens
          }}
        >
          <RootStack.Screen name="Auth" component={createAuthStack} />
          <RootStack.Screen name="Main" component={createMainTabs} />
        </RootStack.Navigator>
      </NavigationContainer>
    </LocationProvider>
  );
}

export default App;
