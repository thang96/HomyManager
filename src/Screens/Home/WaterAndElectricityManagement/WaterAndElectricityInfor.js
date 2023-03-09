import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {colors, icons, images, svgs} from '../../../Constants';
import CustomAppBar from '../../../Components/CustomAppBar';
import {useNavigation} from '@react-navigation/native';
import CustomTextTitle from '../../../Components/CustomTextTitle';
import CustomButtonValue from '../../../Components/CustomButtonValue';
import CustomPersonInfor from '../../../Components/CustomPersonInfor';
import {ScrollView} from 'react-native-virtualized-view';
import CustomWaterAndElectric from '../../../Components/CustomWaterAndElectric';

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
          <CustomWaterAndElectric />
        </View>
      </ScrollView>
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
    alignItems: 'center',
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
