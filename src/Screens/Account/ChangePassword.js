import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import CustomAppBar from '../../Components/CommonComponent/CustomAppBar';
import CustomButtonBottom from '../../Components/CommonComponent/CustomButtonBottom';
import ComponentInput from '../../Components/CommonComponent/ComponentInput';
import {icons} from '../../Constants';
import {useNavigation} from '@react-navigation/native';
const ChangePassword = props => {
  const navigation = useNavigation();
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [reNewPassword, setReNewPassword] = useState();
  return (
    <View style={styles.container}>
      <CustomAppBar
        iconLeft={icons.ic_back}
        label={'Đổi mật khẩu'}
        pressIconLeft={() => navigation.goBack()}
      />
      <ScrollView style={{paddingHorizontal: 10, marginTop: 10}}>
        <ComponentInput
          type={'input'}
          title={'Mật khẩu cũ'}
          viewComponent={{marginTop: 10}}
          styleInput={{backgroundColor: '#EBEDEE'}}
          placeholder={'Nhập mật khẩu cũ'}
          value={oldPassword}
          onChangeText={text => setOldPassword(text)}
        />
        <ComponentInput
          type={'input'}
          title={'Mật khẩu mới'}
          viewComponent={{marginTop: 10}}
          styleInput={{backgroundColor: '#EBEDEE'}}
          placeholder={'Nhập mật khẩu mới'}
          value={newPassword}
          onChangeText={text => setNewPassword(text)}
        />
        <ComponentInput
          type={'input'}
          title={'Xác nhận mật khẩu mới'}
          viewComponent={{marginTop: 10}}
          styleInput={{backgroundColor: '#EBEDEE'}}
          placeholder={'Nhập lại mật khẩu mới'}
          value={reNewPassword}
          onChangeText={text => setReNewPassword(text)}
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
