import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AccountScreen} from '../../../Screens';
const Stack = createStackNavigator();
const StackAccountPage = () => {
  return (
    <Stack.Navigator initialRouteName="AccountScreen">
      <Stack.Screen
        component={AccountScreen}
        name={'AccountScreen'}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default StackAccountPage;
