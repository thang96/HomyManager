import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {MessageScreen} from '../../../Screens';
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
    </Stack.Navigator>
  );
};
export default StackMessagePage;
