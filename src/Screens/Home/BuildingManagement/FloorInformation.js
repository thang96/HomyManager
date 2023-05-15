import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import CustomButton from '../../../Components/CommonComponent/CustomButton';
import {ScrollView} from 'react-native-virtualized-view';
import {colors, icons, images} from '../../../Constants';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import CustomButtonBottom from '../../../Components/CommonComponent/CustomButtonBottom';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import {uuid} from '../../../utils/uuid';
import CustomAppBarFloorInfor from '../../../Components/CommonComponent/CustomAppBarFloorInfor';
import {GetListUnitsApi} from '../../../Api/Home/UnitApis/UnitApis';
import {HauseDetailApi} from '../../../Api/Home/BuildingApis/BuildingApis';
import {token} from '../../../Store/slices/tokenSlice';
import {useDispatch, useSelector} from 'react-redux';
import {statusState, updateStatus} from '../../../Store/slices/statusSlice';

const FloorInformation = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const tokenStore = useSelector(token);
  const [listFloors, setListFloors] = useState([]);
  const [listRoomOfFloor, setListRoomOfFloor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hauseInfor, setHauseInfor] = useState();
  const hauseId = route.params;
  const statusLoading = useSelector(statusState);

  useEffect(() => {
    setLoading(true);
    const getListUnit = async () => {
      await HauseDetailApi(tokenStore, hauseId)
        .then(async res => {
          if (res?.status == 200) {
            setHauseInfor(res?.data);
            let listFloor = [];
            for (let index = 0; index < res?.data?.numberOfFloor; index++) {
              let obj = {floorNumber: index + 1, floorInfor: []};
              listFloor.push(obj);
            }
            setListRoomOfFloor(listFloor);
          }
        })
        .catch(error => console.log(error));
    };
    getListUnit();
  }, [statusLoading]);

  useEffect(() => {
    const getData = async () => {
      await GetListUnitsApi(tokenStore, hauseId)
        .then(res => {
          if (res?.status == 200) {
            let response = res?.data;
            let eachListFloors = [...listRoomOfFloor];
            for (let index = 0; index < response.length; index++) {
              const element = response[index];
              const floorNumber = element?.floorNumber;
              eachListFloors[floorNumber - 1]?.floorInfor?.push(element);
            }
            setListFloors(eachListFloors);
            setLoading(false);
          }
        })
        .catch(error => console.log(error));
    };
    getData();
  }, [listRoomOfFloor]);

  const renderListFloor = (item, index) => {
    return (
      <View>
        {item?.floorInfor?.length > 0 && (
          <View>
            <CustomTextTitle
              viewTitle={{paddingHorizontal: 10}}
              label={`Tầng ${item?.floorNumber}`}
            />
            <FlatList
              numColumns={2}
              data={item?.floorInfor}
              keyExtractor={(key, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <CustomFloorInfor
                    numberRoom={`${item?.name}`}
                    status={`${item?.status}`}
                    username={`${item?.tenantUser}` ?? ''}
                    price={`${item?.rentMonthlyFee?.toLocaleString()}`}
                    onPress={() => {
                      dispatch(updateStatus(false));
                      let id = {houseId: hauseId, unitId: item?.id};
                      navigation.navigate('RoomInformation', id);
                    }}
                  />
                );
              }}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading && <CustomLoading />}
      <CustomAppBarFloorInfor
        hauseName={`${hauseInfor?.name ?? ''}`}
        address={`${hauseInfor?.fullAddress ?? ''}`}
        onPressLeft={() => navigation.goBack()}
        pressIconRight={() => navigation.navigate('NotificationScreen')}
      />
      {loading ? (
        <ActivityIndicator color={colors.mainColor} size={'large'} />
      ) : (
        <>
          <ScrollView style={{paddingHorizontal: 5, paddingTop: 10}}>
            {listFloors.length > 0 ? (
              <FlatList
                numColumns={1}
                data={listFloors}
                keyExtractor={(key, index) => index.toString()}
                renderItem={({item, index}) => renderListFloor(item, index)}
              />
            ) : null}

            <View style={{height: 56}} />
          </ScrollView>
          <CustomButtonBottom
            styleButton={{backgroundColor: colors.mainColor}}
            label={'Thêm phòng'}
            onPress={() => {
              dispatch(updateStatus(false));
              navigation.navigate('AddRoom', route.params);
            }}
          />
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonEdit: {
    height: 22,
    flexDirection: 'row',
    borderRadius: 5,
  },
  labelEdit: {color: 'white', marginLeft: 3, fontSize: 10, marginHorizontal: 3},
  styleButton: {
    backgroundColor: colors.backgroundButton,
    height: 40,
    paddingHorizontal: 5,
    borderRadius: 10,
    flexDirection: 'row',
  },
  icon: {width: 15, height: 15, tintColor: 'white', marginRight: 5},
  icHome: {width: 18, height: 18, tintColor: colors.primary},
  viewFloor: {
    padding: 5,
    borderWidth: 1,
    borderColor: colors.mainColor,
    borderRadius: 10,
    margin: 5,
    height: 86,
  },
  buttomAddFloor: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.backgroundButton,
    marginTop: 30,
    flexDirection: 'row',
  },
  iconAddFloor: {width: 20, height: 20, tintColor: 'white', marginRight: 5},
  labelAddFloor: {fontSize: 16, fontWeight: '500', color: 'white'},
  textPrice: {color: colors.primary, fontSize: 13},
});

const CustomFloorInfor = props => {
  const widthView = Dimensions.get('window').width / 2 - 15;
  const {numberRoom, status, username, price, onPress} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{width: widthView}, styles.viewFloor]}>
      <View style={styles.viewRow}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={icons.ic_home}
            style={[styles.icHome, {marginRight: 5}]}
          />
          <Text style={{color: '#97A1A7', fontSize: 12}}>{numberRoom}</Text>
        </View>
        <CustomButton
          disabled={true}
          label={status == 'Trống' ? 'Trống' : 'Đã thuê'}
          styleLabel={styles.labelEdit}
          styleButton={[
            styles.buttonEdit,
            {
              backgroundColor:
                status == 'Trống' ? 'orange' : colors.backgroundButton,
            },
          ]}
        />
      </View>
      <Text style={{color: '#5F6E78', fontWeight: '400', fontSize: 13}}>
        {username}
      </Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.textPrice}>Giá:</Text>
        <View style={{flex: 1}}>
          <Text numberOfLines={1} style={styles.textPrice}>{` ${price} `}</Text>
        </View>
        <Text style={styles.textPrice}>VNĐ</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FloorInformation;
