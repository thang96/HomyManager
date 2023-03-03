import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import CustomAppBar from '../../../Components/CustomAppBar';
import CustomTwoButtonBottom from '../../../Components/CustomTwoButtonBottom';
import {icons, colors} from '../../../Constants';
import {ScrollView} from 'react-native-virtualized-view';
import CustomInput from '../../../Components/CustomInput';
import CustomTextTitle from '../../../Components/CustomTextTitle';

const AddService = props => {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <CustomAppBar
          iconLeft={icons.ic_back}
          label={'Thêm dịch vụ'}
          iconRight={icons.ic_bell}
          iconSecondRight={icons.ic_moreOption}
          pressIconLeft={() => navigation.goBack()}
        />
        <ScrollView style={[styles.eachContainer]}>
          <Text style={styles.content}>
            Chọn dịch vụ tính phí đã có hoặc thêm mới dịch vụ
          </Text>
          <CustomTextTitle label={'Thông tin dịch vụ'} />
          <CustomInput
            type={'button'}
            title={'Loại dịch vụ'}
            placeholder={'Chọn loại dịch vụ'}
          />
          <CustomInput
            styleViewInput={{marginTop: 20}}
            type={'input'}
            title={'Tên dịch vụ'}
            placeholder={'Nhập tên dịch vụ'}
          />
          <CustomInput
            styleViewInput={{marginTop: 20}}
            type={'button'}
            title={'Thu phí dựa trên'}
            placeholder={'Lũy tiến theo chỉ số'}
          />
          <CustomInput
            styleViewInput={{marginTop: 20}}
            type={'input'}
            title={'Đợn vị đo'}
            placeholder={'Đơn vị đo'}
          />
          <CustomInput
            styleViewInput={{marginTop: 20}}
            type={'input'}
            title={'Phí dịch vụ'}
            placeholder={'Nhập phí dịch vụ'}
            keyboardType={'numeric'}
          />
          <Text style={[styles.label, {marginTop: 20}]}>Ghi chú</Text>
          <View style={styles.viewTextInput}>
            <TextInput multiline placeholder="Nhập ghi chú" />
          </View>
          <View style={{marginBottom: 56}} />
        </ScrollView>

        <CustomTwoButtonBottom
          leftLabel={'Trở lại'}
          rightLabel={'Hoàn tất'}
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => {
            console.log('do some thing');
          }}
        />
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  eachContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: colors.backgroundGrey,
  },
  content: {color: 'rgba(127, 138, 147, 1)', fontSize: 13, fontWeight: '400'},
  label: {fontSize: 15, color: 'rgba(55, 64, 71, 1)', fontWeight: '400'},
  viewTextInput: {
    height: 120,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.borderInput,
    padding: 10,
    backgroundColor: colors.backgroundInput,
  },
});
export default AddService;
