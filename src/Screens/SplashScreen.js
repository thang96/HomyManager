import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {colors, images} from '../Constants';
import {updateToken} from '../Store/slices/tokenSlice';

const SplashScreen = () => {
  const navigation = useNavigation();
  const token = useSelector(state => state?.token?.token);
  const user = useSelector(state => state?.userInfor?.userInfor);
  const dispatch = useDispatch();
  useEffect(() => {
    loginTokenApi();
  }, [token, user]);
  const loginTokenApi = async () => {
    try {
      await AsyncStorage.getItem('token').then(token => {
        if (token) {
          dispatch(updateToken(token));
          callApiToken(token);
        } else if (!token) {
          navigation.navigate('LoginNavigation');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const callApiToken = async () => {
    navigation.navigate('HomeNavigation');
  };
  return (
    <View style={styles.container}>
      <Image
        source={images.im_backgroundSplash}
        style={{width: '100%', height: '100%'}}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default SplashScreen;
