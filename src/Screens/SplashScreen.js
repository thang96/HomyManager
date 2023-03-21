import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AuthenticationAPi} from '../Api/Login/LoginApis';
import CustomLoading from '../Components/CommonComponent/CustomLoading';
import {colors, icons, images} from '../Constants';
import {token, updateToken} from '../Store/slices/tokenSlice';

const SplashScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      loginTokenApi();
    }, 300);
  }, []);

  const loginTokenApi = async () => {
    try {
      await AsyncStorage.getItem('user').then(user => {
        let userStore = JSON.parse(user);
        if (userStore != null && userStore != undefined && userStore != '') {
          callApiToken(userStore);
          dispatch(updateToken(userStore));
        } else {
          navigation.navigate('LoginNavigation');
        }
      });
    } catch (error) {
      Alert.alert(
        'Cảnh báo !',
        'Đã có lỗi hệ thống,xin hãy liên lạc với admin...',
      );
    }
  };
  const callApiToken = async userStore => {
    setLoading(true);
    let username = userStore?.username;
    let password = userStore?.password;
    await AuthenticationAPi(password, username)
      .then(async res => {
        if (200 >= res?.status <= 204) {
          let token = res?.data?.token;
          await AsyncStorage.setItem('token', token);
          dispatch(updateToken(token));
          setLoading(false);
          navigation.navigate('HomeNavigation');
        }
      })
      .catch(error => {
        // Alert.alert('Lỗi', `${error}`)
        setLoading(false);
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      {loading && <CustomLoading modalVisible={loading} />}
      <ImageBackground
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
