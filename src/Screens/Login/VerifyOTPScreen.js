import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Image,
  View,
  TextInput,
  Text,
  ImageBackground,
} from 'react-native';
import {colors, icons, images} from '../../Constants';
import CustomSuggest from '../../Components/CommonComponent/CustomSuggest';
import CustomButton from '../../Components/CommonComponent/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

const VerifyOTPScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const pin1Ref = useRef();
  const pin2Ref = useRef();
  const pin3Ref = useRef();
  const pin4Ref = useRef();

  const [pin1Otp, setPin1Otp] = useState('');
  const [pin2Otp, setPin2Otp] = useState('');
  const [pin3Otp, setPin3Otp] = useState('');
  const [pin4Otp, setPin4Otp] = useState('');

  const [verifyOtp, setVerifyOtp] = useState('');

  const [second, setsecond] = useState(120);
  const timeRef = useRef(second);

  useEffect(() => {
    pin1Ref.current.focus();
    counterTime();
  }, []);

  const counterTime = () => {
    const timerId = setInterval(() => {
      timeRef.current -= 1;
      if (timeRef.current < 0) {
        clearInterval(timerId);
      } else {
        setsecond(timeRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  };

  useEffect(() => {
    setVerifyOtp(`${pin1Otp}${pin2Otp}${pin3Otp}${pin4Otp}`);
  }, [pin4Otp]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={images.im_backgroundLogin}
        style={styles.imageContainer}>
        <CustomButton
          icon={icons.ic_back}
          styleIcon={styles.iconBack}
          styleButton={styles.buttonBack}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Đăng ký tài khoản</Text>
        <CustomSuggest label={'Vui lòng nhập mã OTP được gửi đến'} />
        <View style={styles.viewRow}>
          <Text style={styles.suggest}>Hiệu lực của mã OTP còn</Text>
          <Text style={styles.second}>{second}</Text>
          <Text style={styles.suggest}>giây</Text>
        </View>
        <View style={[styles.viewRow, {height: 100}]}>
          <View style={styles.viewInput}>
            <TextInput
              ref={pin1Ref}
              style={styles.inputStyle}
              maxLength={1}
              keyboardType={'phone-pad'}
              placeholder={'0'}
              onChangeText={text => {
                setPin1Otp(text);
                if (text != '') {
                  pin2Ref.current.focus();
                }
              }}
            />
          </View>
          <View style={styles.viewLine} />
          <View style={styles.viewInput}>
            <TextInput
              ref={pin2Ref}
              style={styles.inputStyle}
              maxLength={1}
              keyboardType={'phone-pad'}
              placeholder={'0'}
              onChangeText={text => {
                setPin2Otp(text);
                if (text != '') {
                  pin3Ref.current.focus();
                }
              }}
            />
          </View>
          <View style={styles.viewLine} />
          <View style={styles.viewInput}>
            <TextInput
              ref={pin3Ref}
              style={styles.inputStyle}
              maxLength={1}
              keyboardType={'phone-pad'}
              placeholder={'0'}
              onChangeText={text => {
                setPin3Otp(text);
                if (text != '') {
                  pin4Ref.current.focus();
                }
              }}
            />
          </View>
          <View style={styles.viewLine} />
          <View style={styles.viewInput}>
            <TextInput
              ref={pin4Ref}
              style={styles.inputStyle}
              maxLength={1}
              keyboardType={'phone-pad'}
              placeholder={'0'}
              onChangeText={text => {
                setPin4Otp(text);
                if (text != '') {
                  pin4Ref.current.blur();
                }
              }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          <CustomSuggest label={'Bạn chưa nhận được mã? '} />
          <CustomButton label={'Gửi lại mã'} styleLabel={styles.sendOTPAgain} />
        </View>
        <CustomButton
          label={'Xác nhận'}
          styleButton={styles.styleButton}
          styleLabel={styles.styleLabel}
          onPress={() => navigation.navigate('ConfirmScreen')}
        />
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  imageContainer: {justifyContent: 'center', alignItems: 'center', flex: 1},
  iconBack: {width: 24, height: 24, tintColor: 'white'},
  buttonBack: {position: 'absolute', top: 10, left: 10},
  title: {color: colors.mainColor, fontWeight: 'bold', fontSize: 18},
  content: {color: 'black', fontSize: 15},
  styleViewTextInput: {
    height: 50,
    width: '100%',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'grey',
    paddingHorizontal: 10,
  },
  styleButton: {
    width: 180,
    height: 50,
    backgroundColor: colors.mainColor,
    borderRadius: 5,
    marginTop: 50,
  },
  styleLabel: {color: 'white'},
  viewOtp: {
    width: 44,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewLine: {
    height: 2,
    width: 10,
    backgroundColor: 'black',
    marginHorizontal: 10,
  },
  viewInput: {
    borderWidth: 1,
    height: 54,
    width: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: '#7F8A93',
  },
  inputStyle: {
    borderBottomWidth: 1,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    height: 44,
    width: 32,
    borderBottomColor: '#7F8A93',
  },
  viewRow: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  suggest: {fontSize: 13, color: 'black', fontWeight: '600'},
  second: {
    color: colors.backgroundOrange,
    fontWeight: '600',
    marginHorizontal: 3,
  },
  sendOTPAgain: {fontWeight: '600', color: colors.mainColor},
});
export default VerifyOTPScreen;
