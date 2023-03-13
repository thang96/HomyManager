import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Alert,
  Text,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {colors, icons, images} from '../../Constants';
import CustomTextInput from '../../Components/CustomTextInput';
import CustomButton from '../../Components/CommonComponent/CustomButton';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {updateToken} from '../../Store/slices/tokenSlice';
import {AuthenticationAPi} from '../../Api/Login/LoginApis';
import CustomLoading from '../../Components/CommonComponent/CustomLoading';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isShow, setIsShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const loginFuntion = async () => {
    let user = {username: username, password: password};
    setLoading(true);
    await AuthenticationAPi(password, username)
      .then(async res => {
        if (200 >= res?.status <= 204) {
          let token = res?.data?.token;
          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('user', JSON.stringify(user));
          dispatch(updateToken(token));
          setLoading(false);
          navigation.navigate('HomeNavigation');
        }
      })
      .catch(error => {
        Alert.alert('Lỗi', `${error}`);
        console.log(error);
      });
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={images.im_backgroundLogin}
        style={styles.container}>
        {loading && <CustomLoading modalVisible={loading} />}
        <ScrollView style={{paddingTop: 220}}>
          <Text style={styles.title}>Đăng nhập/ Đăng ký</Text>
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
                tintColor: '#374047',
              }}
              onPressIconRight={() => setIsShow(!isShow)}
            />
          </View>

          <CustomButton
            styleButton={{alignSelf: 'flex-end', marginTop: 10}}
            styleLabel={{color: colors.mainColor, fontWeight: '600'}}
            label={'Quên mật khẩu'}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginTop: 10,
            }}>
            <Text style={{fontSize: 13, color: '#7F8A93'}}>
              Không có tài khoản?
            </Text>
            <CustomButton
              styleLabel={{color: colors.mainColor, fontWeight: '600'}}
              label={'Đăng ký ngay'}
              onPress={() => navigation.navigate('RegisterScreen')}
            />
          </View>
          <CustomButton
            label={'Đăng nhập'}
            styleButton={styles.styleButton}
            styleLabel={styles.styleLabel}
            onPress={() => loginFuntion()}
          />
          <View style={{height: 250}} />
        </ScrollView>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingTop: 50,
  },
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
    borderColor: '#ACB4B9',
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  styleButton: {
    width: 200,
    height: 44,
    backgroundColor: colors.mainColor,
    borderRadius: 5,
    marginTop: 30,
    alignSelf: 'center',
  },
  styleLabel: {color: 'white', fontSize: 15},
});
export default LoginScreen;
