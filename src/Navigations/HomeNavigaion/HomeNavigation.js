import React from 'react';
import {Image, Text, View, StyleSheet, Animated} from 'react-native';
import {icons, colors} from '../../Constants';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StackHomepage from './StackHomePage/StackHomePage';
import StackWorkpage from './StackWorkPage/StackWorkPage';
import StackStatisticPage from './StackStatisticPage/StackStatisticPage';
import StackAccountPage from './StackAccountPage/StackAccountPage';
import StackMessagePage from './StackMessagePage/StackMessagePage';

const Tab = createBottomTabNavigator();

const HomeNavigation = props => {
  const renderTabBar = (focused, icon, title) => {
    return (
      <View style={styles.view}>
        <Image
          source={icon}
          style={[
            {tintColor: focused ? colors.mainColor : '#5F6E78'},
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
      initialRouteName="StackStatisticPage">
      <Tab.Screen
        component={StackHomepage}
        name={'StackHomepage'}
        options={{
          headerShown: false,
          tabBarActiveTintColor: colors.mainColor,
          tabBarInactiveTintColor: 'rgb(119,119,119)',
          tabBarIcon: ({color, focused, size}) =>
            renderTabBar(focused, icons.ic_homeTabBar, 'Trang chủ'),
        }}
      />
      <Tab.Screen
        component={StackWorkpage}
        name={'StackWorkpage'}
        options={{
          headerShown: false,
          tabBarActiveTintColor: colors.mainColor,
          tabBarInactiveTintColor: 'rgb(119,119,119)',
          tabBarIcon: ({color, focused, size}) =>
            renderTabBar(focused, icons.ic_gearAppBar, 'Công việc'),
        }}
      />
      <Tab.Screen
        component={StackStatisticPage}
        name={'StackStatisticPage'}
        options={{
          headerShown: false,
          tabBarActiveTintColor: colors.mainColor,
          tabBarInactiveTintColor: 'rgb(119,119,119)',
          tabBarIcon: ({color, focused, size}) =>
            renderTabBar(focused, icons.ic_chartAppBar, 'Thống kê'),
        }}
      />
      <Tab.Screen
        component={StackMessagePage}
        name={'StackMessagePage'}
        options={{
          headerShown: false,
          tabBarActiveTintColor: colors.mainColor,
          tabBarInactiveTintColor: 'rgb(119,119,119)',
          tabBarIcon: ({color, focused, size}) =>
            renderTabBar(focused, icons.ic_chatAppBar, 'Tin nhắn'),
        }}
      />
      <Tab.Screen
        component={StackAccountPage}
        name={'StackAccountPage'}
        options={{
          headerShown: false,
          tabBarActiveTintColor: colors.mainColor,
          tabBarInactiveTintColor: 'rgb(119,119,119)',
          tabBarIcon: ({color, focused, size}) =>
            renderTabBar(focused, icons.ic_personAppBar, 'Tài khoản'),
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
