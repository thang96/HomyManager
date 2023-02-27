import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  Image,
  TouchableOpacity,
  Dimensions,
  SectionList,
} from 'react-native';
import CustomAppBar from '../../../Components/CustomAppBar';
import CustomButton from '../../../Components/CustomButton';
import {ScrollView} from 'react-native-virtualized-view';
import {colors, icons, images} from '../../../Constants';
import CustomTextTitle from '../../../Components/CustomTextTitle';
import CustomManagerInfor from '../../../Components/CustomManagerInfor';
import {FlatList} from 'react-native-gesture-handler';
import CustomChecker from '../../../Components/CustomChecker';
import CustomPaidService from '../../../Components/CustomPaidService';
import CustomButtonBottom from '../../../Components/CustomButtonBottom';
import {uuid} from '../../../utils/uuid';
import CustomAppBarRoomInfor from '../../../Components/CustomAppBarRoomInfor';
import CustomAppBarFloorInfor from '../../../Components/CustomAppBarFloorInfor';

const FLOORINFOR = [
  {
    numberFloor: 1,
    rooms: [
      {
        numberRoom: 'P101',
        status: true,
        username: 'Hà Lê Chí Bảo',
        price: '1500000',
      },
      {
        numberRoom: 'P102',
        status: false,
        username: 'Hà Lê Chí Bảo',
        price: '1500000',
      },
      {
        numberRoom: 'P103',
        status: false,
        username: 'Hà Lê Chí Bảo',
        price: '1500000',
      },
      {
        numberRoom: 'P104',
        status: true,
        username: 'Hà Lê Chí Bảo',
        price: '1500000',
      },
    ],
  },
  {
    numberFloor: 2,
    rooms: [
      {
        numberRoom: 'P201',
        status: true,
        username: 'Hà Lê Chí Bảo',
        price: '1500000',
      },
      {
        numberRoom: 'P202',
        status: false,
        username: 'Hà Lê Chí Bảo',
        price: '1500000',
      },
      {
        numberRoom: 'P203',
        status: false,
        username: 'Hà Lê Chí Bảo',
        price: '1500000',
      },
      {
        numberRoom: 'P204',
        status: true,
        username: 'Hà Lê Chí Bảo',
        price: '1500000',
      },
    ],
  },
];

const FloorInformation = () => {
  const navigation = useNavigation();
  const [listFloors, setListFloors] = useState(FLOORINFOR);

  const renderListFloor = (item, index) => {
    return (
      <View key={`${uuid}${index}`}>
        <CustomTextTitle
          viewTitle={{paddingHorizontal: 10}}
          label={`Tầng ${item?.numberFloor}`}
          labelButton={'Thêm phòng'}
        />
        <FlatList
          listKey={`${uuid}${index}`}
          horizontal={false}
          scrollEnabled={false}
          numColumns={2}
          keyExtractor={key => key?.numberRoom}
          data={item?.rooms}
          renderItem={({item, index}) => {
            return (
              <CustomFloorInfor
                numberRoom={`${item?.numberRoom}`}
                status={`${item?.status}`}
                username={`${item?.username}`}
                price={`${item?.price}`}
                onPress={() => {
                  navigation.navigate('RoomInformation');
                }}
              />
            );
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomAppBarFloorInfor onPressLeft={() => navigation.goBack()} />

      <ScrollView style={{paddingHorizontal: 5, paddingTop: 10}}>
        {listFloors.length > 0
          ? listFloors.map((item, index) => renderListFloor(item, index))
          : null}

        <View style={{height: 56}} />
      </ScrollView>
      <CustomButtonBottom
        styleButton={{backgroundColor: colors.backgroundButton}}
        label={'Thêm tầng mới'}
      />
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
    height: 20,
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
          label={status ? 'Đã thuê' : 'Trống'}
          styleLabel={styles.labelEdit}
          styleButton={[
            styles.buttonEdit,
            {
              backgroundColor: status ? colors.backgroundButton : 'orange',
            },
          ]}
        />
      </View>
      <Text style={{color: '#5F6E78', fontWeight: '400', fontSize: 13}}>
        {username}
      </Text>
      <Text
        style={{
          color: colors.primary,
          fontSize: 13,
        }}>{`Giá: ${price} VNĐ`}</Text>
    </TouchableOpacity>
  );
};

export default FloorInformation;
