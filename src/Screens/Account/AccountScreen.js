import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {colors, icons, images, svgs} from '../../Constants';
import {useNavigation} from '@react-navigation/native';
import CustomAppBar from '../../Components/CommonComponent/CustomAppBar';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import CustomButton from '../../Components/CommonComponent/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {updateUserInfor, userInfor} from '../../Store/slices/userInfoSlice';
import {updateStatus, statusState} from '../../Store/slices/statusSlice';
import {GetUserAPi} from '../../Api/User/UserApis';
import {token} from '../../Store/slices/tokenSlice';
import CustomLoading from '../../Components/CommonComponent/CustomLoading';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userStore = useSelector(userInfor);
  const stateLoading = useSelector(statusState);
  const tokenStore = useSelector(token);
  const [loading, setLoading] = useState(true);
  // console.log(userStore);
  useEffect(() => {
    const getData = async () => {
      if (tokenStore != null && tokenStore != undefined && tokenStore != '') {
        await GetUserAPi(tokenStore)
          .then(res => {
            if (res?.status == 200) {
              dispatch(updateUserInfor(res?.data));
              setLoading(false);
            }
          })
          .catch(error => console.log(error));
      }
    };
    getData();
  }, [stateLoading, userStore]);

  return (
    <View style={styles.container}>
      {loading && <CustomLoading />}
      <CustomAppBar
        svgLeft={svgs.LogoApp}
        label={'Tài khoản'}
        iconRight={icons.ic_bell}
        pressIconRight={() => navigation.navigate('NotificationScreen')}
        pressLogo={() => navigation.navigate('StackHomepage')}
      />
      <ScrollView style={styles.scrollView}>
        <View style={[styles.viewRow, {justifyContent: 'space-between'}]}>
          <View style={styles.viewRow}>
            <Image
              source={
                userStore?.avatarImage?.fileUrl
                  ? {uri: userStore?.avatarImage?.fileUrl}
                  : icons.ic_user
              }
              resizeMode="contain"
              style={styles.avatar}
            />
            <View>
              <Text
                style={styles.numberPhone}>{`${userStore?.phoneNumber}`}</Text>
              <Text style={styles.userName}>{`${userStore?.fullName}`}</Text>
            </View>
          </View>
          <CustomButton
            label={'Chỉnh sửa'}
            styleLabel={styles.styleLabel}
            onPress={() => {
              dispatch(updateStatus(true));
              navigation.navigate('EditAccount');
            }}
          />
        </View>
        {/* <CustomComponentButton
          styleButton={[styles.viewShadow, {marginTop: 20}]}
          icon={icons.ic_plusUser}
          label={'Nhân sự'}
        /> */}
        {/* <CustomComponentButton
          styleButton={[styles.viewShadow, {marginTop: 20}]}
          icon={icons.ic_lock}
          label={'Đổi mật khẩu'}
          onPress={() => navigation.navigate('ChangePassword')}
        /> */}

        {/* <View style={[styles.viewMidle, styles.viewShadow, {marginTop: 20}]}>
          <CustomComponentButton icon={icons.ic_book} label={'Chính sách'} />
          <View style={styles.viewLine} />
          <CustomComponentButton
            icon={icons.ic_questionMark}
            label={'Điều khoản sử dụng'}
          />
          <View style={styles.viewLine} />
          <CustomComponentButton
            icon={icons.ic_exclamationMark}
            label={'Phiên bản'}
          />
        </View> */}

        <CustomComponentButton
          styleButton={[styles.viewShadow, {marginTop: 20}]}
          icon={icons.ic_logOut}
          label={'Đăng xuất'}
          onPress={async () => {
            let user = {username: '', password: ''};
            dispatch(updateStatus('logout'));
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('user');
            navigation.navigate('LoginNavigation');
          }}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
  scrollView: {paddingHorizontal: 10, paddingTop: 20},
  viewRow: {flexDirection: 'row', alignItems: 'center'},
  avatar: {width: 60, height: 60, borderRadius: 60, marginRight: 10},
  numberPhone: {color: '#374047'},
  userName: {fontSize: 15, fontWeight: '600', color: '#374047'},
  styleLabel: {color: colors.mainColor},
  viewMidle: {
    minHeight: 155,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 8,
  },
  viewShadow: {
    shadowColor: colors.backgroundButtonGrey,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  viewLine: {
    height: 0.5,
    backgroundColor: colors.borderInput,
    marginHorizontal: 10,
  },
});
export default AccountScreen;

const CustomComponentButton = props => {
  const {icon, label, onPress, styleButton} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          borderRadius: 8,
          height: 50,
          width: '100%',
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
        },
        styleButton,
      ]}>
      <Image
        source={icon}
        style={{width: 24, height: 24, marginHorizontal: 10}}
        resizeMode={'contain'}
      />
      <Text style={{color: '#374047', fontSize: 15}}>{label}</Text>
    </TouchableOpacity>
  );
};
