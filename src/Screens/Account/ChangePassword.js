import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import CustomAppBar from '../../Components/CommonComponent/CustomAppBar';
import CustomInput from '../../Components/CommonComponent/CustomInput';
import CustomButtonBottom from '../../Components/CommonComponent/CustomButtonBottom';
import {icons} from '../../Constants';
import {useNavigation} from '@react-navigation/native';
const ChangePassword = props => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <CustomAppBar
        iconLeft={icons.ic_back}
        label={'Đổi mật khẩu'}
        pressIconLeft={() => navigation.goBack()}
      />
      <ScrollView style={{paddingHorizontal: 10, marginTop: 10}}>
        <CustomInput
          type={'input'}
          title={'Mật khẩu cũ'}
          styleViewInput={{marginTop: 10}}
          styleInput={{backgroundColor: '#EBEDEE'}}
          placeholder={'Nhập mật khẩu cũ'}
          defaultValue={''}
          onEndEditing={evt => {}}
        />
        <CustomInput
          type={'input'}
          title={'Mật khẩu mới'}
          styleViewInput={{marginTop: 10}}
          styleInput={{backgroundColor: '#EBEDEE'}}
          placeholder={'Nhập mật khẩu mới'}
          defaultValue={''}
          onEndEditing={evt => {}}
        />
        <CustomInput
          type={'input'}
          title={'Xác nhận mật khẩu mới'}
          styleViewInput={{marginTop: 10}}
          styleInput={{backgroundColor: '#EBEDEE'}}
          placeholder={'Nhập lại mật khẩu mới'}
          defaultValue={''}
          onEndEditing={evt => {}}
        />
      </ScrollView>
      <CustomButtonBottom label={'Đổi mật khẩu'} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
});
export default ChangePassword;
