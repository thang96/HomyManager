import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {StatisticScreen} from '../../../Screens';
const Stack = createStackNavigator();
const StackStatisticPage = () => {
  return (
    <Stack.Navigator initialRouteName="StatisticScreen">
      <Stack.Screen
        component={StatisticScreen}
        name={'StatisticScreen'}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default StackStatisticPage;
