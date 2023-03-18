import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
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
import CustomButton from '../../../Components/CommonComponent/CustomButton';
import {ScrollView} from 'react-native-virtualized-view';
import {colors, icons, images} from '../../../Constants';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import CustomButtonBottom from '../../../Components/CommonComponent/CustomButtonBottom';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import {uuid} from '../../../utils/uuid';
import CustomAppBarFloorInfor from '../../../Components/CommonComponent/CustomAppBarFloorInfor';
import {GetListUnitsApi} from '../../../Api/Home/UnitApis/UnitApis';
import {token} from '../../../Store/slices/tokenSlice';
import {useSelector} from 'react-redux';

const FloorInformation = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const tokenStore = useSelector(token);
  const [listFloors, setListFloors] = useState([]);
  const [loading, setLoading] = useState(true);
  const hauseId = route.params;
  const focusAdd = useIsFocused();

  useEffect(() => {
    const getListUnit = async () => {
      await GetListUnitsApi(tokenStore, hauseId)
        .then(res => {
          if (res?.status == 200) {
            setListFloors(res?.data);
            setLoading(false);
          }
        })
        .catch(error => console.log(error));
    };
    getListUnit();
  }, [hauseId, focusAdd]);

  const renderListFloor = (item, index) => {
    return (
      <View key={`${uuid}${index}`}>
        <CustomTextTitle
          viewTitle={{paddingHorizontal: 10}}
          label={`Tầng ${item?.floorNumber}`}
          labelButton={'Thêm phòng'}
        />
        <CustomFloorInfor
          numberRoom={`${item?.name}`}
          status={`${item?.isActive}`}
          username={`${item?.username}`}
          price={`${item?.rentMonthlyFee}`}
          onPress={() => {
            navigation.navigate('RoomInformation', item?.id);
          }}
        />
        {/* <FlatList
          listKey={`${item?.id}${index}`}
          horizontal={false}
          scrollEnabled={false}
          numColumns={2}
          keyExtractor={key => key?.id}
          data={listFloors}
          renderItem={({item, index}) => {
            return (
              <CustomFloorInfor
                numberRoom={`${item?.name}`}
                status={`${item?.isActive}`}
                username={`${item?.username}`}
                price={`${item?.price}`}
                onPress={() => {
                  navigation.navigate('RoomInformation');
                }}
              />
            );
          }}
        /> */}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading && <CustomLoading />}
      <CustomAppBarFloorInfor onPressLeft={() => navigation.goBack()} />

      <ScrollView style={{paddingHorizontal: 5, paddingTop: 10}}>
        {listFloors.length > 0
          ? listFloors.map((item, index) => renderListFloor(item, index))
          : null}

        <View style={{height: 56}} />
      </ScrollView>
      <CustomButtonBottom
        styleButton={{backgroundColor: colors.mainColor}}
        label={'Thêm tầng mới'}
        onPress={() => navigation.navigate('AddRoom', hauseId)}
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
