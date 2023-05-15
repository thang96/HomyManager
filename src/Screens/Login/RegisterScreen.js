import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Alert,
  Text,
  ImageBackground,
} from 'react-native';
import {colors, icons, images} from '../../Constants';
import CustomLoading from '../../Components/CommonComponent/CustomLoading';
import CustomButton from '../../Components/CommonComponent/CustomButton';
import {useNavigation} from '@react-navigation/native';
import CustomSuggest from '../../Components/CommonComponent/CustomSuggest';
import ComponentInput from '../../Components/CommonComponent/ComponentInput';
import CustomModalNotify from '../../Components/CommonComponent/CustomModalNotify';
import {AuthenticationRegisterAPi} from '../../Api/Login/LoginApis';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [modalRegister, setModalRegister] = useState();
  const [loading, setLoading] = useState(false);

  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [email, setEmail] = useState('');

  const isReadyData = () =>
    userName != '' &&
    fullName != '' &&
    phoneNumber != '' &&
    email != '' &&
    password != '' &&
    rePassword != '' &&
    password == rePassword;

  const registerAccount = async () => {
    setModalRegister(false);
    setLoading(true);
    let data = {
      userName: userName,
      fullName: fullName,
      phoneNumber: phoneNumber,
      password: password,
      email: email,
    };
    await AuthenticationRegisterAPi(data)
      .then(res => {
        if (res?.status == 200) {
          Alert.alert('Chúc mừng', 'Bạn đã đăng ký thành công', [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('LoginScreen');
                setLoading(false);
              },
            },
          ]);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={{flex: 1}}>
      {loading && <CustomLoading />}
      {modalRegister && (
        <CustomModalNotify
          title={'Tạo tài khoản'}
          label={'Bạn có muốn tạo tài khoản này ?'}
          onRequestClose={() => setModalRegister(false)}
          pressConfirm={() => {
            if (isReadyData()) {
              registerAccount();
            } else {
              Alert.alert(
                'Sai thông tin',
                'Hãy kiểm tra lại thông tin đã nhập',
              );
            }
          }}
        />
      )}
      <ImageBackground
        style={styles.container}
        source={images.im_backgroundLogin}>
        <CustomButton
          icon={icons.ic_back}
          styleIcon={styles.iconBack}
          styleButton={styles.buttonBack}
          onPress={() => navigation.goBack()}
        />
        <View style={{height: 260}} />
        <ScrollView nestedScrollEnabled={true} keyboardDismissMode="none">
          <Text style={styles.title}>Đăng ký tài khoản</Text>
          <CustomSuggest
            labelStyle={{textAlign: 'center'}}
            label={
              'Vui lòng cung cấp thông tin dưới đây để đăng ký tài khoản cho số điện thoại '
            }
          />
          <ComponentInput
            viewComponent={{marginTop: 15}}
            important={true}
            type={'input'}
            title={'Họ và tên'}
            placeholder={'Nhập họ và tên'}
            value={fullName}
            onChangeText={text => setFullName(text)}
          />
          <ComponentInput
            viewComponent={{marginTop: 15}}
            important={true}
            type={'input'}
            title={'Email'}
            placeholder={'Nhập email'}
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <ComponentInput
            viewComponent={{marginTop: 15}}
            important={true}
            type={'input'}
            title={'Số điện thoại'}
            placeholder={'Nhập số điện thoại'}
            keyboardType={'number-pad'}
            value={phoneNumber}
            onChangeText={text => setPhoneNumber(text)}
          />
          <ComponentInput
            viewComponent={{marginTop: 15}}
            important={true}
            type={'input'}
            title={'Tài khoản'}
            placeholder={'Nhập tài khoản'}
            value={userName}
            onChangeText={text => setUserName(text)}
          />
          <ComponentInput
            viewComponent={{marginTop: 15}}
            important={true}
            type={'input'}
            title={'Mật khẩu'}
            placeholder={'Nhập mật khẩu'}
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <ComponentInput
            viewComponent={{marginTop: 15}}
            important={true}
            type={'input'}
            title={'Nhập lại mật khẩu'}
            placeholder={'Nhập lại mật khẩu'}
            value={rePassword}
            onChangeText={text => setRePassword(text)}
          />

          <CustomButton
            label={'Tiếp tục'}
            styleButton={styles.styleButton}
            styleLabel={styles.styleLabel}
            onPress={() => setModalRegister(true)}
          />

          <View style={{height: 56}} />
        </ScrollView>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  title: {
    color: colors.mainColor,
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center',
    lineHeight: 18,
  },
  content: {fontSize: 15, color: '#374047'},
  styleViewTextInput: {
    height: 48,
    width: '150%',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#ACB4B9',
    paddingHorizontal: 15,
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
  buttonBack: {position: 'absolute', top: 15, left: 15, zIndex: 1},
  iconBack: {width: 24, height: 24, tintColor: 'white'},
});
export default RegisterScreen;
