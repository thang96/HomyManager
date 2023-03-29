import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  IssueInformation,
  MarkTheIssue,
  WorkScreen,
  AddExtraFee,
} from '../../../Screens';
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
      <Stack.Screen
        component={IssueInformation}
        name={'IssueInformation'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={MarkTheIssue}
        name={'MarkTheIssue'}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        component={AddExtraFee}
        name={'AddExtraFee'}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default StackWorkpage;
