import React, {useState} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import CustomSuggest from '../../Components/CustomSuggest';
import {colors, icons, images, svgs} from '../../Constants';
import CustomTextInput from '../../Components/CustomTextInput';
import CustomButton from '../../Components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {updateToken} from '../../Store/slices/tokenSlice';

const ConfirmScreen = props => {
  const navigation = useNavigation();
  const [isShow, setIsShow] = useState(false);
  const [password, setPassword] = useState();
  const dispatch = useDispatch();

  const loginFuntion = async () => {
    await AsyncStorage.setItem('token', '123456').then(() => {
      navigation.navigate('HomeNavigation');
      dispatch(updateToken('123465'));
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={images.im_backgroundLogin}
        style={styles.imageContainer}>
        <Text style={[styles.title, {marginBottom: 15}]}>Đăng nhập</Text>
        <CustomSuggest label={'Xin chào !!!'} />
        <Text style={styles.numberPhone}>0123456789</Text>
        <View style={{paddingHorizontal: 10}}>
          <Text style={styles.content}>Mật khẩu</Text>
          <CustomTextInput
            secureTextEntry={isShow ? false : true}
            styleViewTextInput={styles.styleViewTextInput}
            placeholder={'Nhập mật khẩu'}
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
          styleButton={{marginTop: 20}}
          label={'Đổi sang tài khoản khác'}
          styleLabel={styles.changeAccount}
        />
        <CustomButton
          label={'Xác nhận'}
          styleButton={styles.styleButton}
          styleLabel={styles.styleLabel}
          onPress={() => loginFuntion()}
        />
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  imageContainer: {justifyContent: 'center', alignItems: 'center', flex: 1},
  title: {color: colors.mainColor, fontWeight: 'bold', fontSize: 18},
  numberPhone: {
    fontWeight: '600',
    color: '#374047',
    fontSize: 15,
    lineHeight: 18,
    marginBottom: 15,
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
  changeAccount: {fontSize: 12, color: '#000000', fontWeight: '600'},
  styleButton: {
    width: 180,
    height: 50,
    backgroundColor: colors.mainColor,
    borderRadius: 5,
    marginTop: 30,
  },
  styleLabel: {color: 'white'},
});
export default ConfirmScreen;
