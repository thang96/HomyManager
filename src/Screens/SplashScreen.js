import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../Constants';
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
      <Text style={styles.title}>Homy</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});
export default SplashScreen;
