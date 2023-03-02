import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  ConfirmScreen,
  LoginScreen,
  RegisterScreen,
  VerifyOTPScreen,
} from '../../Screens';

const Stack = createStackNavigator();
const LoginNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        component={LoginScreen}
        name={'LoginScreen'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={RegisterScreen}
        name={'RegisterScreen'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={VerifyOTPScreen}
        name={'VerifyOTPScreen'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ConfirmScreen}
        name={'ConfirmScreen'}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default LoginNavigation;
