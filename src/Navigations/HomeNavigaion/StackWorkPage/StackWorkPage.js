import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {WorkScreen} from '../../../Screens';
const Stack = createStackNavigator();
const StackWorkpage = () => {
  return (
    <Stack.Navigator initialRouteName="WorkScreen">
      <Stack.Screen
        component={WorkScreen}
        name={'WorkScreen'}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default StackWorkpage;
