import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {colors, icons, images, svgs} from '../../../Constants';
import CustomAppBar from '../../../Components/CommonComponent/CustomAppBar';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../../Components/CommonComponent/CustomButton';
import CustomButtonValue from '../../../Components/CommonComponent/CustomButtonValue';
import ComponentUnfinished from '../../../Components/ComponentHome/WaterAndElectricity/ComponentUnfinished';

const WaterAndElectricityManager = props => {
  const navigation = useNavigation();
  const [isActive, setIsActive] = useState(1);
  return (
    <View style={styles.container}>
      <CustomAppBar
        iconLeft={icons.ic_back}
        pressIconLeft={() => navigation.goBack()}
        label={'Chốt điện nước'}
      />
      <View style={{paddingHorizontal: 10}}>
        <CustomButtonValue
          styleView={{marginVertical: 10}}
          type={'button'}
          icon={icons.ic_businessOutline}
          placeholder={'Chọn tòa nhà'}
          value={'Tòa nhà D2'}
        />
        <View style={styles.viewButtonTop}>
          <CustomButton
            styleButton={[
              {
                backgroundColor:
                  isActive == 1 ? colors.backgroundOrange : 'white',
              },
              styles.viewButton,
            ]}
            label={'Chưa chốt'}
            styleLabel={{color: isActive == 1 ? 'white' : '#7F8A93'}}
            onPress={() => setIsActive(1)}
          />
          <CustomButton
            styleButton={[
              {
                backgroundColor:
                  isActive == 2 ? colors.backgroundOrange : 'white',
              },
              styles.viewButton,
            ]}
            label={'Đã chốt'}
            styleLabel={{color: isActive == 2 ? 'white' : '#7F8A93'}}
            onPress={() => setIsActive(2)}
          />
        </View>
      </View>
      {isActive == 1 ? (
        <ComponentUnfinished
          data={FACE_DATA}
          onPress={item => navigation.navigate('ConfirmWaterAndElectricity')}
        />
      ) : isActive == 2 ? null : isActive == 3 ? null : null}
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
});
export default WaterAndElectricityManager;
const FACE_DATA = [
  {
    floor: 1,
    room: [
      {
        room: 'P101',
        status: false,
        value: 'Điện: 12KWH | Nước: 13 Khối',
        name: 'Đức Thắng',
      },
      {
        room: 'P103',
        status: false,
        value: 'Điện: 12KWH | Nước: 13 Khối',
        name: 'Đức Thắng',
      },
    ],
  },
  {
    floor: 2,
    room: [
      {
        room: 'P201',
        status: false,
        value: 'Điện: 12KWH  Nước: 13 Khối',
        name: 'Đức Thắng',
      },
    ],
  },
];
