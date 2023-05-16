import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {colors, icons, images} from '../../../Constants';
import BoxShowInfor from '../../../Components/CommonComponent/BoxShowInfor';
import {FlatList} from 'react-native-gesture-handler';
import {StraightLine} from '../../../Components/CommonComponent/LineComponent';
import CustomAppBarBuildingInfor from '../../../Components/CommonComponent/CustomAppBarBuildingInfor';
import CustomModalNotify from '../../../Components/CommonComponent/CustomModalNotify';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import CustomSuggest from '../../../Components/CommonComponent/CustomSuggest';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import {
  DeleteBuildingApi,
  HauseDetailApi,
} from '../../../Api/Home/BuildingApis/BuildingApis';
import RenderService from '../../../Components/ComponentHome/RenderService';
import RenderAmenity from '../../../Components/ComponentHome/RenderAmenity';
import RenderImage from '../../../Components/ComponentHome/RenderImage';
import {useDispatch, useSelector} from 'react-redux';
import {token} from '../../../Store/slices/tokenSlice';
import CustomBankAccountInfor from '../../../Components/ComponentHome/BankAccount/CustomBankAccountInfor';
import {updateStatus} from '../../../Store/slices/statusSlice';

const BuildingInformation = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const isFocused = useIsFocused();
  const tokenStore = useSelector(token);
  const [loading, setLoading] = useState(true);
  const [hauseInfor, setHauseInfor] = useState();
  const [openTimeValue, setOpenTimeValue] = useState('');
  const [closeTimeValue, setCloseTimeValue] = useState('');
  const [modalDeleteHouse, setModalDeleteHouse] = useState(false);
  const hauseId = route.params;

  useEffect(() => {
    const getDataHause = async () => {
      await HauseDetailApi(tokenStore, hauseId)
        .then(res => {
          if (res?.status == 200) {
            let eachOpenTime = new Date(`${res?.data?.openTime}`);
            let eachCloseTime = new Date(`${res?.data?.closeTime}`);
            setOpenTimeValue(eachOpenTime.toLocaleTimeString('en-VN'));
            setCloseTimeValue(eachCloseTime.toLocaleTimeString('en-VN'));
            setHauseInfor(res?.data);
            setLoading(false);
          }
        })
        .catch(error => console.error(error));
    };
    getDataHause();
  }, [isFocused]);

  const renderSevices = (item, index) => {
    return (
      <RenderService
        disabled={true}
        name={item?.name}
        fee={item?.fee}
        icon={item?.icon}
        calculateUnit={item?.calculateUnit}
      />
    );
  };

  const renderAmenitys = (item, index) => {
    return <RenderAmenity disabled={true} label={item?.name} />;
  };

  const renderImageHauses = (item, index) => {
    return <RenderImage data={item} />;
  };
  const deleteHouse = async () => {
    setModalDeleteHouse(false);
    setLoading(true);
    await DeleteBuildingApi(tokenStore, hauseId)
      .then(res => {
        if (res?.status == 200) {
          dispatch(updateStatus('deleteHouse'));
          navigation.navigate('BuildingManager');
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      {loading && (
        <CustomLoading
          modalVisible={loading}
          pressBack={() => navigation.goBack()}
        />
      )}
      {modalDeleteHouse && (
        <CustomModalNotify
          modalVisible={modalDeleteHouse}
          title={'Xóa nhà'}
          label={'Bạn có muốn xóa căn nhà này'}
          onRequestClose={() => setModalDeleteHouse(false)}
          pressConfirm={() => deleteHouse()}
        />
      )}
      <CustomAppBarBuildingInfor
        pressIconRight={() => navigation.navigate('NotificationScreen')}
        nameBuilding={`${hauseInfor?.name ?? ''}`}
        addressBuilding={`${hauseInfor?.fullAddress ?? ''}`}
        onPressLeft={() => navigation.goBack()}
        pressDelete={() => setModalDeleteHouse(true)}
      />
      <ScrollView
        nestedScrollEnabled={true}
        keyboardDismissMode="none"
        style={{paddingHorizontal: 10, paddingTop: 20}}>
        <View style={styles.viewUtils}>
          <CustomOptionBT
            title={'Phòng'}
            content={`${hauseInfor?.unitTotal ?? 0}`}
            icon={icons.ic_bed}
            styleImageBG={{tintColor: '#1297c0'}}
            styleBGIcon={{backgroundColor: '#ebf9fd'}}
            onPress={() =>
              navigation.navigate('FloorInformation', hauseInfor?.id)
            }
          />
          <CustomOptionBT
            title={'Trống'}
            content={`${hauseInfor?.emptyUnitTotal ?? 0}`}
            icon={icons.ic_key}
            styleImageBG={{tintColor: '#ff8d37'}}
            styleBGIcon={{backgroundColor: '#fff3e9'}}
          />
          <CustomOptionBT
            title={'Người'}
            content={`${hauseInfor?.unitTotal ?? 0}`}
            icon={icons.ic_men}
            styleImageBG={{tintColor: '#7ace68'}}
            styleBGIcon={{backgroundColor: '#e6f6e2'}}
            onPress={() => navigation.navigate('TenantManager')}
          />
          <CustomOptionBT
            title={'Sự cố'}
            content={`${hauseInfor?.issueTotal ?? 0}`}
            icon={icons.ic_hammer}
            styleImageBG={{tintColor: '#f5dc00'}}
            styleBGIcon={{backgroundColor: '#fefdd9'}}
          />
        </View>
        {StraightLine()}

        <CustomTextTitle
          label={'Thông tin tòa nhà'}
          labelButton={'Chỉnh sửa'}
          onPress={() => navigation.navigate('EditHouseInformation', hauseId)}
        />
        <View style={[styles.viewRow, {marginBottom: 10}]}>
          <BoxShowInfor
            label={'Giờ mở cửa'}
            content={openTimeValue}
            unit={'AM'}
          />
          <View style={{width: 10}} />
          <BoxShowInfor
            label={'Giờ đóng cửa'}
            content={closeTimeValue}
            unit={'PM'}
          />
        </View>
        <BoxShowInfor
          label={'Chi phí thuê'}
          content={`${hauseInfor?.leasingFee?.toLocaleString() ?? 0}`}
          unit={'VNĐ'}
        />

        {StraightLine()}

        <CustomTextTitle
          label={'Quản lý tòa nhà'}
          labelButton={'Thêm'}
          icon={icons.ic_plus}
        />
        <CustomTextTitle label={'Thông tin thanh toán'} />

        <CustomBankAccountInfor
          viewCustom={{marginBottom: 10}}
          imageUrl={hauseInfor?.bankAccount?.bank?.logo}
          userName={hauseInfor?.bankAccount?.name}
          accountNo={hauseInfor?.bankAccount?.notice}
          pressDetail={() =>
            navigation.navigate('PaymentDetail', hauseInfor?.bankAccount?.id)
          }
        />
        {StraightLine()}

        <CustomTextTitle label={'Dịch vụ có phí'} />
        <View>
          <ScrollView horizontal={true} style={{width: '100%'}}>
            {hauseInfor?.chargeServices?.length > 0 ? (
              <FlatList
                listKey="chargeServices"
                horizontal={false}
                scrollEnabled={false}
                numColumns={2}
                keyExtractor={(key, index) => `${key?.name}${index.toString()}`}
                data={hauseInfor?.chargeServices}
                renderItem={({item, index}) => renderSevices(item, index)}
              />
            ) : null}
          </ScrollView>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textPicker}>Đã chọn </Text>
          <Text
            style={
              styles.pickerTotal
            }>{`${hauseInfor?.chargeServices?.length}`}</Text>
        </View>

        {StraightLine()}

        <CustomTextTitle label={'Tiện ích miễn phí'} />
        <View>
          <ScrollView horizontal={true} style={{width: '100%'}}>
            {hauseInfor?.amenities.length > 0 ? (
              <FlatList
                listKey="amenities"
                horizontal={false}
                scrollEnabled={false}
                numColumns={3}
                keyExtractor={(key, index) => `${key?.name}${index.toString()}`}
                data={hauseInfor?.amenities}
                renderItem={({item, index}) => renderAmenitys(item, index)}
              />
            ) : null}
          </ScrollView>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textPicker}>Đã chọn </Text>
          <Text
            style={
              styles.pickerTotal
            }>{`${hauseInfor?.amenities.length}`}</Text>
        </View>

        {StraightLine()}

        <CustomTextTitle label={'Ảnh tòa nhà'} />
        {hauseInfor?.images?.length > 0 && (
          <FlatList
            listKey="imagesHause"
            horizontal
            data={hauseInfor?.images}
            keyExtractor={key => key?.id}
            renderItem={({item, index}) => renderImageHauses(item, index)}
          />
        )}
        {StraightLine()}
        <CustomTextTitle label={'Lưu ý cho người thuê'} />
        <CustomSuggest label={`${hauseInfor?.notice}`} />
        <CustomTextTitle label={'Lưu ý cho hóa đơn'} />
        <CustomSuggest label={`${hauseInfor?.billNotice}`} />
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
  viewUtils: {
    height: 128,
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    margin: 1,
    elevation: 3,
  },
  textPicker: {fontSize: 11, fontWeight: '400', color: 'orange'},
  pickerTotal: {
    fontSize: 15,
    color: 'orange',
    fontWeight: '600',
  },
});

const CustomOptionBT = props => {
  const {
    icon,
    styleImageBG,
    styleButton,
    styleBGIcon,
    title,
    content,
    onPress,
  } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styleOption.button, styleButton]}>
      <View style={[styleOption.backgroundIcon, styleBGIcon]}>
        <Image
          style={[styleOption.icon, styleImageBG]}
          source={icon}
          resizeMode={'contain'}
        />
      </View>
      {title && <Text style={styleOption.title}>{title}</Text>}
      {content && <Text style={styleOption.content}>{content}</Text>}
    </TouchableOpacity>
  );
};
const styleOption = StyleSheet.create({
  button: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  icon: {height: 20, width: 20},
  title: {fontSize: 11, color: 'rgba(127, 138, 147, 1)', textAlign: 'center'},
  content: {fontSize: 15, fontWeight: 'bold', color: 'rgba(55, 64, 71, 1)'},
  backgroundIcon: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
export default BuildingInformation;
