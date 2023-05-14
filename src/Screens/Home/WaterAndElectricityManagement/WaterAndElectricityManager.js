import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {colors, icons, images, svgs} from '../../../Constants';
import CustomAppBar from '../../../Components/CommonComponent/CustomAppBar';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../../Components/CommonComponent/CustomButton';
import CustomButtonValue from '../../../Components/CommonComponent/CustomButtonValue';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import {useDispatch, useSelector} from 'react-redux';
import {token} from '../../../Store/slices/tokenSlice';
import {GetAllInvoiceUnClosingsApi} from '../../../Api/Home/WaterAndElectricityApis/WaterAndElectricityApis';
import RenderWaterElectricity from '../../../Components/ComponentHome/WaterAndElectricity/RenderWaterElectricity';
import {updateStatus} from '../../../Store/slices/statusSlice';

const WaterAndElectricityManager = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const tokenStore = useSelector(token);
  const [isActive, setIsActive] = useState(1);
  const [loading, setLoading] = useState(true);
  const [listInvoiceClosing, setListInvoiceClosing] = useState([]);
  const [listInvoiceUnClosing, setListInvoiceUnClosing] = useState([]);
  // console.log(listInvoiceUnClosing[0]?.contract?.unit);
  useEffect(() => {
    const getData = async () => {
      await GetAllInvoiceUnClosingsApi(tokenStore)
        .then(res => {
          if (res?.status == 200) {
            let listData = res?.data;
            let closing = [];
            let unClosing = [];
            for (let index = 0; index < listData?.length; index++) {
              const element = listData[index];
              if (element?.statusName == 'Đã chốt') {
                closing.push(element);
              } else if (element?.statusName == 'Chưa chốt') {
                unClosing.push(element);
              }
            }
            setListInvoiceClosing(closing);
            setListInvoiceUnClosing(unClosing);
            setLoading(false);
          }
        })
        .catch(error => {
          console.log(error);
        });
    };
    getData();
  }, []);

  return (
    <View style={styles.container}>
      {loading && <CustomLoading />}
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
        <View style={{flex: 1, paddingHorizontal: 10}}>
          <FlatList
            data={listInvoiceUnClosing}
            keyExtractor={key => `${key?.id}`}
            renderItem={({item, index}) => {
              return (
                <RenderWaterElectricity
                  data={item}
                  onPress={() => {
                    dispatch(updateStatus('toDoUpdate'));
                    navigation.navigate('ConfirmWaterAndElectricity', item?.id);
                  }}
                />
              );
            }}
          />
        </View>
      ) : isActive == 2 ? (
        <View style={{flex: 1, paddingHorizontal: 10}}>
          <FlatList
            data={listInvoiceClosing}
            keyExtractor={key => `${key?.id}`}
            renderItem={({item, index}) => {
              return (
                <RenderWaterElectricity
                  data={item}
                  onPress={() =>
                    navigation.navigate('ConfirmWaterAndElectricity', item?.id)
                  }
                />
              );
            }}
          />
        </View>
      ) : isActive == 3 ? null : null}
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
