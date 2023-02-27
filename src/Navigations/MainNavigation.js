import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {SplashScreen} from '../Screens';
import {createStackNavigator} from '@react-navigation/stack';
import HomeNavigation from './HomeNavigaion/HomeNavigation';
import LoginNavigation from './LoginNavigation/LoginNavigation';
const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        component={SplashScreen}
        name={'SplashScreen'}
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={LoginNavigation}
        name={'LoginNavigation'}
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={HomeNavigation}
        name={'HomeNavigation'}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default MainNavigation;
