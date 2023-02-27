import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Alert,
  Text,
  ImageBackground,
} from 'react-native';
import {colors, icons, images} from '../../Constants';
import CustomTextInput from '../../Components/CustomTextInput';
import CustomButton from '../../Components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {updateToken} from '../../Store/slices/tokenSlice';
import CustomInput from '../../Components/CustomInput';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isShow, setIsShow] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loginFuntion = async () => {
    await AsyncStorage.setItem('token', '123456').then(() => {
      navigation.navigate('HomeNavigation');
      dispatch(updateToken('123465'));
    });
  };
  return (
    <ImageBackground
      source={images.im_backgroundSplash}
      style={styles.container}>
      <Text style={styles.title}>Đăng nhập/ Đăng ký</Text>
      {/* <CustomInput
        type={'input'}
        title={'Tài khoản'}
        placeholder={'Nhập tài khoản'}
      />
      <CustomInput
        type={'input'}
        title={'Mật khẩu'}
        placeholder={'Nhập mật khẩu'}
      /> */}
      <View style={{marginTop: 30}}>
        <Text style={styles.content}>Tài khoản</Text>
        <CustomTextInput
          styleViewTextInput={styles.styleViewTextInput}
          placeholder={'nhập tài khoản'}
          value={username}
          onChangeText={text => setUsername(text)}
        />
      </View>
      <View style={{marginTop: 15}}>
        <Text style={styles.content}>Mật khẩu</Text>
        <CustomTextInput
          secureTextEntry={isShow ? false : true}
          styleViewTextInput={styles.styleViewTextInput}
          placeholder={'nhập mật khẩu'}
          value={password}
          onChangeText={text => setPassword(text)}
          iconRight={isShow ? icons.ic_show : icons.ic_hide}
          styleIconRight={{
            width: 30,
            height: 30,
            tintColor: isShow ? 'grey' : '#dadee0',
          }}
          onPressIconRight={() => setIsShow(!isShow)}
        />
      </View>
      <CustomButton
        label={'Tiếp tục'}
        styleButton={styles.styleButton}
        styleLabel={styles.styleLabel}
        onPress={() => loginFuntion()}
      />
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', paddingHorizontal: 10},
  title: {
    color: colors.mainColor,
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center',
  },
  content: {fontSize: 15, color: '#374047'},
  styleViewTextInput: {
    height: 48,
    width: '100%',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#dadee0',
    paddingHorizontal: 10,
    backgroundColor: '#f8f9f9',
  },
  styleButton: {
    width: 200,
    height: 44,
    backgroundColor: colors.mainColor,
    borderRadius: 5,
    marginTop: 50,
    alignSelf: 'center',
  },
  styleLabel: {color: 'white', fontSize: 15},
});
export default LoginScreen;
