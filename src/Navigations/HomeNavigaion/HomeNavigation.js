import React from 'react';
import {Image, Text, View, StyleSheet, Animated} from 'react-native';
import {icons, colors} from '../../Constants';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StackHomepage from './StackHomePage/StackHomePage';

const Tab = createBottomTabNavigator();

const HomeNavigation = props => {
  const renderTabBar = (focused, icon, title) => {
    return (
      <View style={styles.view}>
        <Image
          source={icon}
          style={[
            {tintColor: focused ? colors.mainColor : 'black'},
            styles.image,
          ]}
          resizeMode="contain"
        />
        <Text
          style={[
            {color: focused ? colors.mainColor : 'rgb(119,119,119)'},
            styles.text,
          ]}>
          {title}
        </Text>
      </View>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {height: 56},
      })}
      initialRouteName="StackHomepage">
      <Tab.Screen
        component={StackHomepage}
        name={'StackHomepage'}
        options={{
          headerShown: false,
          tabBarActiveTintColor: colors.mainColor,
          tabBarInactiveTintColor: 'rgb(119,119,119)',
          tabBarIcon: ({color, focused, size}) =>
            renderTabBar(focused, icons.ic_home, 'Trang chủ'),
        }}
      />
      <Tab.Screen
        component={StackHomepage}
        name={'Stack'}
        options={{
          headerShown: false,
          tabBarActiveTintColor: colors.mainColor,
          tabBarInactiveTintColor: 'rgb(119,119,119)',
          tabBarIcon: ({color, focused, size}) =>
            renderTabBar(focused, icons.ic_home, 'Tài khoản'),
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  view: {justifyContent: 'center', alignItems: 'center'},
  image: {width: 28, height: 28},
  text: {textAlign: 'center', fontSize: 10},
});
export default HomeNavigation;
