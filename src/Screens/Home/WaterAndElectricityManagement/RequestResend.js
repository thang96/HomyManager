import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import CustomAppBar from '../../../Components/CommonComponent/CustomAppBar';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import {colors, icons} from '../../../Constants';
import {ScrollView} from 'react-native-virtualized-view';
import {useNavigation} from '@react-navigation/native';
import CustomPersonInfor from '../../../Components/CommonComponent/CustomPersonInfor';
import CustomWaterAndElectric from '../../../Components/ComponentHome/CustomWaterAndElectric';
import CustomTwoButtonBottom from '../../../Components/CommonComponent/CustomTwoButtonBottom';

const RequestResend = props => {
  const navigation = useNavigation();
  let avatar =
    'https://www.niabizoo.com/wp-content/uploads/2018/05/ms-animals-habitats-mammals.jpg';
  return (
    <View style={styles.container}>
      <CustomAppBar
        iconLeft={icons.ic_back}
        pressIconLeft={() => navigation.goBack()}
        label={'Thông tin điện nước'}
      />
      <ScrollView style={{paddingHorizontal: 10}}>
        <CustomTextTitle label={'Quản lý ghi chỉ số'} />
        <CustomPersonInfor
          avatar={avatar}
          userName={'Bùi Đức Thắng'}
          phoneNumber={'012345678'}
        />
        <CustomTextTitle label={'Tháng trước'} />
        <View style={[styles.viewBetween, styles.shadowView, {height: 80}]}>
          <CustomWaterAndElectric
            styleView={{flex: 1}}
            title={'Chỉ số điện'}
            value={30}
            unit={'KWH'}
          />
          <View style={{width: 5}} />
          <CustomWaterAndElectric
            styleView={{flex: 1}}
            title={'Chỉ số nước'}
            value={1325}
            unit={'Khối'}
          />
        </View>

        <CustomTextTitle label={'Tháng này'} />
        <View style={[styles.viewBetween, styles.shadowView, {height: 80}]}>
          <CustomWaterAndElectric
            styleView={{flex: 1}}
            title={'Chỉ số điện'}
            value={30}
            unit={'KWH'}
            label={'Khách'}
          />
          <View style={{width: 5}} />
          <CustomWaterAndElectric
            styleView={{flex: 1}}
            title={'Chỉ số nước'}
            value={1325}
            unit={'Khối'}
            label={'Khách'}
          />
        </View>
        <View style={[styles.viewBetween, styles.shadowView, {height: 80}]}>
          <CustomWaterAndElectric
            styleView={{flex: 1}}
            title={'Chỉ số điện'}
            value={30}
            unit={'KWH'}
            label={'Quản lý'}
          />
          <View style={{width: 5}} />
          <CustomWaterAndElectric
            styleView={{flex: 1}}
            title={'Chỉ số nước'}
            value={1325}
            label={'Quản lý'}
          />
        </View>
        <View style={[styles.viewBetween, styles.shadowView, {height: 80}]}>
          <CustomWaterAndElectric
            styleView={{flex: 1}}
            title={'Chỉ số điện'}
            value={30}
            unit={'KWH'}
            label={'Lệch'}
          />
          <View style={{width: 5}} />
          <CustomWaterAndElectric
            styleView={{flex: 1}}
            title={'Chỉ số nước'}
            value={1325}
            unit={'Khối'}
            label={'Lệch'}
          />
        </View>
        <CustomTextTitle label={'Ghi chú'} />
        <Text style={styles.label}>{'Ghi chú'}</Text>
        <View style={styles.viewInput}>
          <TextInput placeholder="Nhập ghi chú hoàn tác" />
        </View>
        <View style={{height: 56}} />
      </ScrollView>
      <CustomTwoButtonBottom
        leftLabel={'Trở về'}
        styleLabelLeft={{color: '#FE7A37', fontSize: 15, fontWeight: '600'}}
        styleButtonLeft={{
          borderColor: '#FE7A37',
          backgroundColor: 'white',
          marginRight: 5,
        }}
        rightLabel={'Gửi yêu cầu'}
        onPressLeft={() => navigation.goBack()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
  viewBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shadowView: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 1,
  },
  label: {fontSize: 15, color: '#374047'},
  viewInput: {
    height: 120,
    borderWidth: 1,
    borderColor: colors.borderInput,
    borderRadius: 4,
  },
});
export default RequestResend;
