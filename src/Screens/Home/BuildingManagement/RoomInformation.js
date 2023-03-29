import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
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
import CustomButtonBottom from '../../../Components/CommonComponent/CustomButtonBottom';
import CustomButton from '../../../Components/CommonComponent/CustomButton';
import {ScrollView} from 'react-native-virtualized-view';
import {colors, icons, images} from '../../../Constants';
import BoxShowInfor from '../../../Components/CommonComponent/BoxShowInfor';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import {FlatList} from 'react-native-gesture-handler';
import File from '../../../Assets/Svgs/File.svg';
import RenderService from '../../../Components/ComponentHome/RenderService';
import RenderAmenity from '../../../Components/ComponentHome/RenderAmenity';
import CustomAppBarRoomInfor from '../../../Components/CommonComponent/CustomAppBarRoomInfor';
import {GetUnitDetailAPi} from '../../../Api/Home/UnitApis/UnitApis';
import {useSelector} from 'react-redux';
import {token} from '../../../Store/slices/tokenSlice';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import RenderImage from '../../../Components/ComponentHome/RenderImage';

const RoomInformation = props => {
  const route = useRoute();
  const unitId = route.params;
  const tokenStore = useSelector(token);
  const navigation = useNavigation();
  const [unit, setUnit] = useState();
  const [loading, setLoading] = useState(true);
  // console.log(unit);
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
      <CustomAppBarRoomInfor
        rentMonthlyFee={`${unit?.rentMonthlyFee?.toLocaleString()}`}
        nameRoom={`${unit?.name}`}
        onPressLeft={() => navigation.goBack()}
        pressIconRight={() => navigation.navigate('NotificationScreen')}
      />
      <ScrollView style={{paddingHorizontal: 10, paddingTop: 10}}>
        <CustomTextTitle label={'Thông tin phòng'} />

        <View style={styles.viewRow}>
          <BoxShowInfor label={'Tầng'} content={`${unit?.floorNumber}`} />
          <View style={{width: 10}} />
          <BoxShowInfor
            label={'Diện tích'}
            content={`${unit?.area}`}
            unit={'m2'}
          />
        </View>
        <View style={[styles.viewRow, {marginTop: 10}]}>
          <BoxShowInfor
            label={'Số người tối đa'}
            content={`${unit?.limitTenantNumber}`}
            unit={'Người'}
          />
          <View style={{width: 10}} />
          <BoxShowInfor
            styleView={{marginTop: 10}}
            label={'Loại phòng'}
            content={`${unit?.roomType}`}
          />
        </View>
        <View style={[styles.viewRow, {marginTop: 10}]}>
          <BoxShowInfor
            label={'Đặt cọc'}
            content={`${unit?.depositMoney?.toLocaleString()}`}
            unit={'VNĐ'}
          />
          <View style={{width: 10}} />
          <BoxShowInfor
            label={'Giá'}
            content={`${unit?.rentMonthlyFee?.toLocaleString()}`}
            unit={'VNĐ'}
          />
        </View>

        <View style={styles.line} />

        <CustomTextTitle label={'Hợp đồng cho thuê'} />

        <View style={styles.line} />

        <CustomTextTitle label={'Thông tin người ở'} />

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
                  label={item?.name}
                  value={item?.fee}
                  icon={item?.icon}
                />
              );
            }}
          />
        ) : null}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textPicker}>Đã chọn </Text>
          <Text
            style={
              styles.pickerTotal
            }>{`${unit?.chargeServices?.length}`}</Text>
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
              return <RenderAmenity label={item?.name} />;
            }}
          />
        ) : null}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textPicker}>Đã chọn </Text>
          <Text style={styles.pickerTotal}>{`${unit?.amenities?.length}`}</Text>
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
  textPicker: {fontSize: 15, fontWeight: '400', color: 'rgba(254, 122, 55, 1)'},
  pickerTotal: {
    fontSize: 15,
    color: 'rgba(254, 122, 55, 1)',
    fontWeight: '600',
  },
});

const CustomTenantInformation = props => {
  const {styleView} = props;
  return (
    <View
      style={[
        {
          backgroundColor: 'rgba(1,1,1,0.1)',
          borderRadius: 10,
          borderLeftWidth: 5,
          borderLeftColor: colors.green,
          justifyContent: 'center',
          padding: 10,
          height: 64,
        },
        styleView,
      ]}>
      <View style={styles.viewRow}>
        <Text style={{fontWeight: '600', color: '#374047', fontSize: 13}}>
          Nguyễn Văn A
        </Text>
        <CustomButton
          label={'Xóa'}
          styleLabel={{fontWeight: '400', color: '#E62154', fontSize: 12}}
        />
      </View>
      <View style={styles.viewRow}>
        <Text style={{fontWeight: '400', color: '#374047', fontSize: 12}}>
          {'SĐT: 0123456789'}
        </Text>
        <Text style={{fontWeight: '400', color: '#374047', fontSize: 12}}>
          {'Ngày vào: 01-02-2022'}
        </Text>
      </View>
    </View>
  );
};

const CustomContract = props => {
  const {} = props;
  return (
    <View
      style={{
        backgroundColor: 'rgba(1,1,1,0.1)',
        borderRadius: 10,
        borderLeftWidth: 5,
        borderLeftColor: colors.backgroundButton,
        justifyContent: 'center',
        padding: 10,
        height: 110,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <File width={18} height={18} />
        <Text
          style={{
            marginLeft: 5,
            color: '#5F6E78',
            fontSize: 13,
            fontWeight: '400',
          }}>{`Số hợp đồng: #12345`}</Text>
      </View>
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
        <Text
          style={{
            color: '#374047',
            fontFamily: 'sf-pro-text-regular',
            lineHeight: 18,
            fontWeight: '400',
            fontStyle: 'normal',
            fontSize: 13,
          }}>
          Thời hạn:
        </Text>
        <Text
          style={{
            color: '#374047',
            fontFamily: 'sf-pro-text-bold',
            lineHeight: 18,
            fontWeight: '600',
            fontStyle: 'normal',
            letterSpacing: -1,
            fontSize: 13,
          }}>{`Từ 09-02-2023 Đến 09-03-2025`}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <CustomButton
          styleButton={{
            height: 34,
            borderWidth: 1,
            borderColor: colors.backgroundOrange,
            borderRadius: 5,
            paddingHorizontal: 10,
          }}
          label={'Chỉnh sửa'}
          styleLabel={{
            fontWeight: '400',
            color: colors.backgroundOrange,
            fontSize: 13,
          }}
        />
        <CustomButton
          styleButton={{
            height: 34,
            borderWidth: 1,
            borderColor: colors.backgroundButton,
            borderRadius: 5,
            paddingHorizontal: 10,
            marginHorizontal: 10,
          }}
          label={'Thanh lý'}
          styleLabel={{
            fontWeight: '400',
            color: colors.backgroundButton,
            fontSize: 13,
          }}
        />
        <CustomButton
          styleButton={{
            height: 34,
            borderWidth: 1,
            borderColor: 'red',
            borderRadius: 5,
            paddingHorizontal: 10,
          }}
          label={'Xóa'}
          styleLabel={{fontWeight: '400', color: 'red', fontSize: 13}}
        />
      </View>
    </View>
  );
};

export default RoomInformation;
