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
import CustomSuggest from '../../Components/CustomSuggest';
import CustomInput from '../../Components/CustomInput';
import {ScrollView} from 'react-native-virtualized-view';

const RegisterScreen = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      style={styles.container}
      source={images.im_backgroundLogin}>
      <CustomButton
        icon={icons.ic_back}
        styleIcon={styles.iconBack}
        styleButton={styles.buttonBack}
        onPress={() => navigation.goBack()}
      />
      <ScrollView style={{paddingTop: 260}}>
        <Text style={styles.title}>Đăng ký tài khoản</Text>
        <CustomSuggest
          labelStyle={{textAlign: 'center'}}
          label={
            'Vui lòng cung cấp thông tin dưới đây để đăng ký tài khoản cho số điện thoại '
          }
        />
        <Text style={[styles.content, {marginTop: 10}]}>Họ và tên</Text>
        <CustomTextInput
          styleViewTextInput={styles.styleViewTextInput}
          placeholder={'Nhập họ và tên'}
          value={''}
          onChangeText={text => {}}
        />
        <Text style={[styles.content, {marginTop: 10}]}>Email</Text>
        <CustomTextInput
          styleViewTextInput={styles.styleViewTextInput}
          placeholder={'Nhập email'}
          value={''}
          onChangeText={text => {}}
        />
        <Text style={[styles.content, {marginTop: 10}]}>Mật khẩu</Text>
        <CustomTextInput
          styleViewTextInput={styles.styleViewTextInput}
          placeholder={'Nhập mật khẩu'}
          value={''}
          onChangeText={text => {}}
        />
        <Text style={[styles.content, {marginTop: 10}]}>Nhập lại mật khẩu</Text>
        <CustomTextInput
          styleViewTextInput={styles.styleViewTextInput}
          placeholder={'Nhập lại mật khẩu'}
          value={''}
          onChangeText={text => {}}
        />
        <CustomButton
          label={'Tiếp tục'}
          styleButton={styles.styleButton}
          styleLabel={styles.styleLabel}
          onPress={() => navigation.navigate('VerifyOTPScreen')}
        />
      </ScrollView>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
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
    width: '100%',
    borderWidth: 1,
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
  buttonBack: {position: 'absolute', top: 10, left: 10, zIndex: 1},
  iconBack: {width: 24, height: 24, tintColor: 'white'},
});
export default RegisterScreen;
