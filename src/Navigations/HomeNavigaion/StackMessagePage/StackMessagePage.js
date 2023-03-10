import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ChatScreen, MessageScreen} from '../../../Screens';
const Stack = createStackNavigator();
const StackMessagePage = () => {
  return (
    <Stack.Navigator initialRouteName="MessageScreen">
      <Stack.Screen
        component={MessageScreen}
        name={'MessageScreen'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ChatScreen}
        name={'ChatScreen'}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default StackMessagePage;
