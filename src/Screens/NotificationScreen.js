import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CustomAppBar from '../Components/CustomAppBar';
import {colors, icons, images} from '../Constants';
import {updateToken} from '../Store/slices/tokenSlice';
const NotificationScreen = props => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <CustomAppBar
        iconLeft={icons.ic_back}
        pressIconLeft={() => navigation.goBack()}
        label={'Thông báo'}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
});
export default NotificationScreen;
