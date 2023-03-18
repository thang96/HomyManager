import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {colors, icons, images, svgs} from '../../../Constants';
import CustomAppBar from '../../../Components/CommonComponent/CustomAppBar';
import {useNavigation} from '@react-navigation/native';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import CustomButtonValue from '../../../Components/CommonComponent/CustomButtonValue';
import CustomPersonInfor from '../../../Components/CommonComponent/CustomPersonInfor';
import CustomTwoButtonBottom from '../../../Components/CommonComponent/CustomTwoButtonBottom';
import {ScrollView} from 'react-native-virtualized-view';
import CustomWaterAndElectric from '../../../Components/ComponentHome/CustomWaterAndElectric';

const WaterAndElectricityInfor = () => {
  const navigation = useNavigation();
  const [isActive, setIsActive] = useState(1);
  return (
    <View style={styles.container}>
      <CustomAppBar
        iconLeft={icons.ic_back}
        pressIconLeft={() => navigation.goBack()}
        label={'Thông tin điện nước'}
      />
      <View style={{paddingHorizontal: 10}}>
        <CustomButtonValue
          styleView={{marginVertical: 10}}
          type={'button'}
          icon={icons.ic_businessBuilding}
          placeholder={'Chọn tòa nhà'}
          value={'Tòa nhà D2'}
        />
      </View>
      <ScrollView style={{paddingHorizontal: 10}}>
        <CustomTextTitle label={'Người gửi'} />
        <CustomPersonInfor userName={'Kiều Anh'} phoneNumber={'012234456'} />

        <CustomTextTitle label={'Quản lý ghi chỉ số'} />
        <CustomPersonInfor userName={'Đức Thắng'} phoneNumber={'012234456'} />

        <CustomTextTitle label={'Chỉ số trước'} />
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

        <CustomTextTitle label={'Chỉ số sau'} />
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
        <View style={{height: 30}}>
          <Text style={{color: '#FF1E1E', fontSize: 13}}>
            Mức chênh lệch quá lớn, yêu cầu gửi lại !!!
          </Text>
        </View>
        <CustomTextTitle label={'Tiêu thụ'} />
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
        <View style={{marginBottom: 20}}>
          <Text style={{color: '#374047', fontSize: 13}}>
            Chỉ số tiêu thụ được tính theo chỉ số người dùng nhập
          </Text>
        </View>
      </ScrollView>
      <CustomTwoButtonBottom
        leftLabel={'Yêu cầu gửi lại'}
        styleLabelLeft={{color: '#FE7A37', fontSize: 15, fontWeight: '600'}}
        styleButtonLeft={{
          borderColor: '#FE7A37',
          backgroundColor: 'white',
          marginRight: 5,
        }}
        rightLabel={'Xác nhận'}
        onPressLeft={() => navigation.navigate('RequestResend')}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
  viewButtonTop: {
    backgroundColor: 'white',
    borderRadius: 4,
    height: 48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 10,
    paddingHorizontal: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewButton: {
    height: 42,
    borderRadius: 4,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    flex: 1,
  },
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
});
export default WaterAndElectricityInfor;
