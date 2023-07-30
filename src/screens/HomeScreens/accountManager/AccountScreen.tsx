import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {colors, icons, images} from '../../../constants';
import {useNavigation} from '@react-navigation/native';
import AppBarComponent from '../../../components/appBarComponent/AppBarComponent';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import ButtonComponent from '../../../components/commonComponent/ButtonComponent';
import {useDispatch, useSelector} from 'react-redux';
import {updateUser, userInfor} from '../../../store/slices/userInforSlice';
import {
  updateReloadStatus,
  reloadState,
} from '../../../store/slices/reloadSlice';
import {GetUserAPi} from '../../../apis/homeApi/userApi';
import {token} from '../../../store/slices/tokenSlice';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateAppStatus} from '../../../store/slices/appStatusSlice';
import DeviceInfo from 'react-native-device-info';
import {DeleteNotificationFromDeviceApi} from '../../../apis/homeApi/notificationDeviceApi';

const AccountScreen = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const userStore = useSelector(userInfor);
  const stateLoading = useSelector(reloadState);
  const tokenStore = useSelector(token);
  const [loading, setLoading] = useState(true);
  const deviceId = DeviceInfo.getDeviceId();
  // console.log(userStore);
  useEffect(() => {
    const getData = async () => {
      if (tokenStore != null && tokenStore != undefined && tokenStore != '') {
        await GetUserAPi(tokenStore)
          .then((res: any) => {
            if (res?.status == 200) {
              dispatch(updateUser(res?.data));
              setLoading(false);
            }
          })
          .catch(error => console.log(error));
      }
    };
    getData();
  }, [stateLoading, userStore]);

  const handleLogout = async () => {
    setLoading(true);

    await DeleteNotificationFromDeviceApi(tokenStore, deviceId)
      .then(async (res: any) => {
        if (res?.status === 200) {
          await AsyncStorage.removeItem('token').then(async () => {
            await AsyncStorage.removeItem('user').then(() => {
              dispatch(updateReloadStatus('logOut'));
              dispatch(updateAppStatus('rejects'));
              setLoading(false);
            });
          });
        }
      })
      .catch(async error => {
        await AsyncStorage.removeItem('token').then(async () => {
          await AsyncStorage.removeItem('user').then(() => {
            dispatch(updateReloadStatus('logOut'));
            dispatch(updateAppStatus('rejects'));
            setLoading(false);
          });
        });
      });

    await AsyncStorage.removeItem('token').then(async () => {
      await AsyncStorage.removeItem('user').then(() => {
        dispatch(updateReloadStatus('logOut'));
        dispatch(updateAppStatus('rejects'));
        setLoading(false);
      });
    });
  };

  return (
    <View style={styles.container}>
      {loading && <LoadingComponent />}
      <AppBarComponent
        iconHome={icons.ic_logoApp}
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
          <ButtonComponent
            label={'Chỉnh sửa'}
            styleLabel={styles.styleLabel}
            onPress={() => {
              dispatch(updateReloadStatus(true));
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
          onPress={() => handleLogout()}
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

const CustomComponentButton = (props: any) => {
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
