import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {colors, icons, images, svgs} from '../../Constants';
import LogoApp from '../../Assets/Svgs/LogoApp.svg';
import {useNavigation} from '@react-navigation/native';
import CustomSearchAppBar from '../../Components/CustomSearchAppBar';
import CustomAppBar from '../../Components/CustomAppBar';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import CustomButton from '../../Components/CustomButton';

const AccountScreen = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState(FAKE_DATA);
  return (
    <View style={styles.container}>
      <CustomAppBar
        svgLeft={svgs.LogoApp}
        label={'Tài khoản'}
        iconRight={icons.ic_bell}
        pressLogo={() => navigation.navigate('StackHomepage')}
      />
      <ScrollView style={styles.scrollView}>
        <View style={[styles.viewRow, {justifyContent: 'space-between'}]}>
          <View style={styles.viewRow}>
            <Image
              source={
                userInfo?.avatar ? {uri: userInfo?.avatar} : icons.ic_user
              }
              style={styles.avatar}
            />
            <View>
              <Text style={styles.numberPhone}>0943437458</Text>
              <Text style={styles.userName}>Bùi Đức Thắng</Text>
            </View>
          </View>
          <CustomButton label={'Chỉnh sửa'} styleLabel={styles.styleLabel} />
        </View>
        <CustomComponentButton
          styleButton={{marginTop: 20}}
          icon={icons.ic_plusUser}
          label={'Nhân sự'}
        />
        <CustomComponentButton
          styleButton={{marginTop: 20}}
          icon={icons.ic_lock}
          label={'Đổi mật khẩu'}
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
          shadowColor: colors.borderInput,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 8,
          elevation: 5,
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

const FAKE_DATA = {
  avatar:
    'https://i.natgeofe.com/k/63b1a8a7-0081-493e-8b53-81d01261ab5d/red-panda-full-body_4x3.jpg',
};
