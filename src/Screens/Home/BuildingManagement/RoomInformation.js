import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
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
import {convertDate, formatNumber} from '../../../utils/common';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import RenderImage from '../../../Components/ComponentHome/RenderImage';
import RenderContract from '../../../Components/ComponentHome/RenderContract';
import CustomModalNotify from '../../../Components/CommonComponent/CustomModalNotify';
import {StraightLine} from '../../../Components/CommonComponent/LineComponent';

const RoomInformation = props => {
  const route = useRoute();
  const unitId = route.params.unitId;
  const tokenStore = useSelector(token);
  const navigation = useNavigation();
  const [unit, setUnit] = useState();
  const [loading, setLoading] = useState(true);
  const [modalDeleteRoom, setModalDeleteRoom] = useState(false);

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

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      {loading && <CustomLoading />}
      {modalDeleteRoom && (
        <CustomModalNotify
          modalVisible={modalDeleteRoom}
          title={'Xóa phòng'}
          label={'Bạn có muốn xóa phòng này ?'}
          onRequestClose={() => setModalDeleteRoom(false)}
          pressConfir={() => {}}
        />
      )}
      <CustomAppBarRoomInfor
        rentMonthlyFee={`${formatNumber(`${unit?.rentMonthlyFee}`) ?? 0}`}
        nameRoom={`${unit?.name ?? ''}`}
        onPressLeft={() => navigation.goBack()}
        pressIconRight={() => navigation.navigate('NotificationScreen')}
        pressDelete={() => setModalDeleteRoom(true)}
        pressQuickAddRoom={() =>
          navigation.navigate('QuickAddRoom', route.params)
        }
        pressEdit={() =>
          navigation.navigate('EditRoomInformation', route.params)
        }
      />
      <ScrollView
        nestedScrollEnabled={true}
        keyboardDismissMode="none"
        style={{paddingHorizontal: 10, paddingTop: 10}}>
        <CustomTextTitle label={'Thông tin phòng'} />

        <View style={styles.viewRow}>
          <BoxShowInfor label={'Tầng'} content={`${unit?.floorNumber ?? ''}`} />
          <View style={{width: 10}} />
          <BoxShowInfor
            label={'Diện tích'}
            content={`${unit?.area ?? ''}`}
            unit={'m2'}
          />
        </View>
        <View style={[styles.viewRow, {marginTop: 10}]}>
          <BoxShowInfor
            label={'Số người tối đa'}
            content={`${unit?.limitTenantNumber ?? ''}`}
            unit={'Người'}
          />
          <View style={{width: 10}} />
          <BoxShowInfor
            styleView={{marginTop: 10}}
            label={'Loại phòng'}
            content={`${unit?.roomType ?? ''}`}
          />
        </View>
        <View style={[styles.viewRow, {marginTop: 10}]}>
          <BoxShowInfor
            label={'Đặt cọc'}
            content={`${formatNumber(`${unit?.depositMoney}`) ?? ''}`}
            unit={'VNĐ'}
          />
          <View style={{width: 10}} />
          <BoxShowInfor
            label={'Giá'}
            content={`${formatNumber(`${unit?.rentMonthlyFee}`) ?? ''}`}
            unit={'VNĐ'}
          />
        </View>

        {StraightLine()}

        <CustomTextTitle
          label={'Hợp đồng cho thuê'}
          labelButton={unit?.activeContract ? '' : 'Thêm hợp đồng'}
          onPress={() => navigation.navigate('CreateContractFromRoom', unitId)}
        />
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
        {StraightLine()}

        <CustomTextTitle label={'Thông tin người ở'} />
        <View>
          <ScrollView horizontal={true} style={{width: '100%'}}>
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
          </ScrollView>
        </View>

        {StraightLine()}

        <CustomTextTitle label={'Dịch vụ có phí'} />
        <View>
          <ScrollView horizontal={true} style={{width: '100%'}}>
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
                      onPress={() =>
                        navigation.navigate('ServiceDetail', item?.id)
                      }
                    />
                  );
                }}
              />
            ) : null}
          </ScrollView>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textPicker}>Đã chọn </Text>
          <Text style={styles.pickerTotal}>{`${
            unit?.chargeServices?.length ?? 0
          }`}</Text>
        </View>

        {StraightLine()}
        <CustomTextTitle label={'Tiện ích miễn phí'} />

        <View>
          <ScrollView horizontal={true} style={{width: '100%'}}>
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
                      onPress={() =>
                        navigation.navigate('AmenityDetail', item?.id)
                      }
                    />
                  );
                }}
              />
            ) : null}
          </ScrollView>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textPicker}>Đã chọn </Text>
          <Text style={styles.pickerTotal}>{`${
            unit?.amenities?.length ?? 0
          }`}</Text>
        </View>

        {StraightLine()}

        <CustomTextTitle label={'Ảnh phòng'} />
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
        {StraightLine()}

        <CustomTextTitle label={'Mô tả phòng'} />
        <Text style={{color: 'black', fontSize: 14}}>{unit?.description}</Text>
        {StraightLine()}

        <CustomTextTitle label={'Lưu ý cho người thuê'} />
        <Text style={{color: 'black', fontSize: 14}}>{unit?.notice}</Text>

        <View style={{height: 56}} />
      </ScrollView>
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
  textBuilding: {fontSize: 25, fontWeight: 'bold', color: 'white'},
  textPicker: {fontSize: 11, fontWeight: '400', color: 'rgba(254, 122, 55, 1)'},
  pickerTotal: {
    fontSize: 15,
    color: 'rgba(254, 122, 55, 1)',
    fontWeight: '600',
  },
});

export default RoomInformation;
