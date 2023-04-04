import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import {colors, icons, images} from '../../../Constants';
import BoxShowInfor from '../../../Components/CommonComponent/BoxShowInfor';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import CustomPersonInfor from '../../../Components/CommonComponent/CustomPersonInfor';
import {FlatList} from 'react-native-gesture-handler';
import RenderService from '../../../Components/ComponentHome/RenderService';
import RenderAmenity from '../../../Components/ComponentHome/RenderAmenity';
import CustomAppBarRoomInfor from '../../../Components/CommonComponent/CustomAppBarRoomInfor';
import {GetUnitDetailAPi} from '../../../Api/Home/UnitApis/UnitApis';
import {useSelector} from 'react-redux';
import {token} from '../../../Store/slices/tokenSlice';
import {convertDate} from '../../../utils/common';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import RenderImage from '../../../Components/ComponentHome/RenderImage';
import RenderContract from '../../../Components/ComponentHome/RenderContract';

const RoomInformation = props => {
  const route = useRoute();
  const unitId = route.params;
  const tokenStore = useSelector(token);
  const navigation = useNavigation();
  const [unit, setUnit] = useState();
  const [loading, setLoading] = useState(true);
  // console.log(unit?.activeContract?.tenants);
  useEffect(() => {
    const getListData = async () => {
      await GetUnitDetailAPi(tokenStore, unitId)
        .then(res => {
          if (res?.status == 200) {
            setUnit(res?.data);
            setLoading(false);
          }
        })
        .catch(error => console.log(error, 'error unit detail'));
    };
    getListData();
  }, []);
  //QuickAddRoom
  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      {loading && <CustomLoading />}
      <CustomAppBarRoomInfor
        rentMonthlyFee={`${unit?.rentMonthlyFee?.toLocaleString() ?? 0}`}
        nameRoom={`${unit?.name ?? ''}`}
        onPressLeft={() => navigation.goBack()}
        pressIconRight={() => navigation.navigate('NotificationScreen')}
        pressQuickAddRoom={() => navigation.navigate('QuickAddRoom', unit?.id)}
        pressEdit={() => navigation.navigate('EditRoomInformation', unit?.id)}
      />
      <ScrollView style={{paddingHorizontal: 10, paddingTop: 10}}>
        <CustomTextTitle label={'Thông tin phòng'} />

        <View style={styles.viewRow}>
          <BoxShowInfor label={'Tầng'} content={`${unit?.floorNumber}`} />
          <View style={{width: 10}} />
          <BoxShowInfor
            label={'Diện tích'}
            content={`${unit?.area ?? 0}`}
            unit={'m2'}
          />
        </View>
        <View style={[styles.viewRow, {marginTop: 10}]}>
          <BoxShowInfor
            label={'Số người tối đa'}
            content={`${unit?.limitTenantNumber ?? 0}`}
            unit={'Người'}
          />
          <View style={{width: 10}} />
          <BoxShowInfor
            styleView={{marginTop: 10}}
            label={'Loại phòng'}
            content={`${unit?.roomType ?? 0}`}
          />
        </View>
        <View style={[styles.viewRow, {marginTop: 10}]}>
          <BoxShowInfor
            label={'Đặt cọc'}
            content={`${unit?.depositMoney?.toLocaleString() ?? 0}`}
            unit={'VNĐ'}
          />
          <View style={{width: 10}} />
          <BoxShowInfor
            label={'Giá'}
            content={`${unit?.rentMonthlyFee?.toLocaleString() ?? 0}`}
            unit={'VNĐ'}
          />
        </View>

        <View style={styles.line} />

        <CustomTextTitle label={'Hợp đồng cho thuê'} />
        {unit?.activeContract && (
          <RenderContract
            description={unit?.activeContract?.description}
            startDate={`${convertDate(unit?.activeContract?.startDate)}`}
            endDate={`${convertDate(unit?.activeContract?.endDate)}`}
            houseName={`${unit?.activeContract?.unit?.house?.name}`}
            unitName={`${unit?.activeContract?.unit?.name}`}
            contractOwner={`${unit?.activeContract?.contractOwner?.fullName}`}
            onPress={() =>
              navigation.navigate('ContractDetail', unit?.activeContract?.id)
            }
          />
        )}
        <View style={styles.line} />

        <CustomTextTitle label={'Thông tin người ở'} />
        {unit?.activeContract?.tenants.length > 0 && (
          <FlatList
            data={unit?.activeContract?.tenants}
            keyExtractor={key => key?.id}
            renderItem={({item, index}) => {
              return (
                <CustomPersonInfor
                  styleView={{marginTop: 10}}
                  avatar={item?.avatarImage?.fileUrl}
                  userName={item?.fullName}
                  phoneNumber={item?.phoneNumber}
                  pressAvatar={() =>
                    navigation.navigate('TenantDetail', item?.id)
                  }
                />
              );
            }}
          />
        )}

        <View style={styles.line} />

        <CustomTextTitle label={'Dịch vụ có phí'} />

        {unit?.chargeServices?.length > 0 ? (
          <FlatList
            listKey="chargeServices"
            horizontal={false}
            scrollEnabled={false}
            numColumns={2}
            keyExtractor={(key, index) => `${key?.id}${index.toString()}`}
            data={unit?.chargeServices}
            renderItem={({item, index}) => {
              return (
                <RenderService
                  name={item?.name}
                  fee={item?.fee}
                  calculateUnit={item?.calculateUnit}
                  onPress={() => navigation.navigate('ServiceDetail', item?.id)}
                />
              );
            }}
          />
        ) : null}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textPicker}>Đã chọn </Text>
          <Text style={styles.pickerTotal}>{`${
            unit?.chargeServices?.length ?? 0
          }`}</Text>
        </View>

        <View style={styles.line} />
        <CustomTextTitle label={'Tiện ích miễn phí'} />

        {unit?.amenities?.length > 0 ? (
          <FlatList
            listKey="amenities"
            horizontal={false}
            scrollEnabled={false}
            numColumns={3}
            keyExtractor={(key, index) => `${key?.id}${index.toString()}`}
            data={unit?.amenities}
            renderItem={({item, index}) => {
              return (
                <RenderAmenity
                  label={item?.name}
                  onPress={() => navigation.navigate('AmenityDetail', item?.id)}
                />
              );
            }}
          />
        ) : null}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textPicker}>Đã chọn </Text>
          <Text style={styles.pickerTotal}>{`${
            unit?.amenities?.length ?? 0
          }`}</Text>
        </View>

        <View style={styles.line} />

        <CustomTextTitle label={'Hình ảnh của phòng'} />
        {unit?.images?.length > 0 && (
          <FlatList
            listKey="imagesUnit"
            horizontal
            data={unit?.images}
            keyExtractor={key => key?.id}
            renderItem={({item, index}) => {
              return <RenderImage data={item} deleteItem={async () => {}} />;
            }}
          />
        )}
        <View style={styles.line} />

        <CustomTextTitle label={'Mô tả phòng'} />
        <Text style={{color: 'black', fontSize: 14}}>{unit?.description}</Text>
        <View style={styles.line} />

        <CustomTextTitle label={'Lưu ý cho người thuê'} />
        <Text style={{color: 'black', fontSize: 14}}>{unit?.notice}</Text>

        <View style={styles.line} />

        <View style={{height: 56}} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
  line: {
    height: 0.5,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#97A1A7',
    marginVertical: 20,
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textBuilding: {fontSize: 25, fontWeight: 'bold', color: 'white'},
  textPicker: {fontSize: 11, fontWeight: '400', color: 'rgba(254, 122, 55, 1)'},
  pickerTotal: {
    fontSize: 15,
    color: 'rgba(254, 122, 55, 1)',
    fontWeight: '600',
  },
});

export default RoomInformation;
