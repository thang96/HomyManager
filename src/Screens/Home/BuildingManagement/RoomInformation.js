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
import CustomButtonBottom from '../../../Components/CustomButtonBottom';
import CustomButton from '../../../Components/CustomButton';
import {ScrollView} from 'react-native-virtualized-view';
import {colors, icons, images} from '../../../Constants';
import CustomViewInfor from '../../../Components/CustomViewInfor';
import CustomTextTitle from '../../../Components/CustomTextTitle';
import {FlatList} from 'react-native-gesture-handler';
import File from '../../../Assets/Svgs/File.svg';
import CustomPaidService from '../../../Components/CustomPaidService';
import CustomFreeService from '../../../Components/CustomFreeService';
import {uuid} from '../../../utils/uuid';
import CustomAppBarRoomInfor from '../../../Components/CustomAppBarRoomInfor';

const RoomInformation = props => {
  const navigation = useNavigation();
  const [listPaidSevice, setListPaidSevice] = useState([
    {label: 'Điện', value: '4000/KWH'},
    {label: 'Nước', value: '5000/M³'},
    {label: 'Wifi', value: '50000/T'},
    {label: 'Ga', value: '200000/T'},
    {label: 'Ga1', value: '200000/T'},
    {label: 'Ga2', value: '200000/T'},
    {label: 'Ga3', value: '200000/T'},
  ]);
  const [listFreeSevice, setListFreeSevice] = useState([
    {label: 'Máy lạnh', value: '1'},
    {label: 'WC riêng', value: '2'},
    {label: 'Chỗ để xe', value: '3'},
    {label: 'Tủ lạnh', value: '4'},
    {label: 'Máy giặt', value: '5'},
    {label: 'Giờ tự do', value: '6'},
    {label: 'Chăn - màn', value: '7'},
  ]);
  const renderPaidSevice = (item, index) => {
    let value = item;
    return (
      <CustomPaidService
        label={item?.label}
        value={item?.value}
        onPress={() => {
          deletePaidService(value);
        }}
      />
    );
  };
  const deletePaidService = (item, index) => {
    let result = [...listPaidSevice];
    let newResult = result.filter(itemResult => itemResult !== item);
    setListPaidSevice(newResult);
  };
  const renderFreeSevice = (item, index) => {
    let value = item;
    return (
      <CustomFreeService
        label={item?.label}
        value={item?.value}
        onPress={() => {
          deleteFreeSevice(value);
        }}
      />
    );
  };
  const deleteFreeSevice = (item, index) => {
    let result = [...listFreeSevice];
    let newResult = result.filter(itemResult => itemResult !== item);
    setListFreeSevice(newResult);
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      <CustomAppBarRoomInfor onPressLeft={() => navigation.goBack()} />
      <ScrollView style={{paddingHorizontal: 10, paddingTop: 10}}>
        <CustomTextTitle label={'Thông tin phòng'} />

        <View style={styles.viewRow}>
          <CustomViewInfor title={'Tầng'} label={'1'} />
          <CustomViewInfor title={'Diện tích'} label={'10'} content={'m2'} />
        </View>
        <View style={[styles.viewRow, {marginTop: 10}]}>
          <CustomViewInfor
            title={'Số người tối đa'}
            label={'4'}
            content={'Người'}
          />
          <CustomViewInfor title={'Đặt cọc'} label={'500000'} content={'VNĐ'} />
        </View>
        <CustomViewInfor
          styleView={{marginTop: 10}}
          title={'Loại phòng'}
          label={'Studio'}
        />

        <View style={styles.line} />

        <CustomTextTitle label={'Hợp đồng cho thuê'} />

        <CustomContract />

        <View style={styles.line} />

        <CustomTextTitle
          label={'Thông tin người ở'}
          labelButton={'Thêm người'}
        />

        <CustomTenantInformation styleView={{marginBottom: 10}} />
        <CustomTenantInformation />

        <View style={styles.line} />

        <CustomTextTitle label={'Dịch vụ có phí'} />

        {listPaidSevice.length > 0 ? (
          <FlatList
            listKey="listPaidSevice"
            horizontal={false}
            scrollEnabled={false}
            numColumns={2}
            keyExtractor={key => key.label}
            data={listPaidSevice}
            renderItem={({item, index}) => renderPaidSevice(item, index)}
          />
        ) : null}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textPicker}>Đã chọn </Text>
          <Text style={styles.pickerTotal}>{`${listPaidSevice.length}`}</Text>
        </View>

        <View style={styles.line} />
        <CustomTextTitle label={'Tiện ích miễn phí'} />

        {listFreeSevice.length > 0 ? (
          <FlatList
            listKey="listFreeSevice"
            horizontal={false}
            scrollEnabled={false}
            numColumns={3}
            keyExtractor={key => key.value}
            data={listFreeSevice}
            renderItem={({item, index}) => renderFreeSevice(item, index)}
          />
        ) : null}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textPicker}>Đã chọn </Text>
          <Text style={styles.pickerTotal}>{`${listFreeSevice.length}`}</Text>
        </View>

        <View style={styles.line} />

        <CustomTextTitle label={'Mô tả phòng'} />
        <Text style={{color: 'black', fontSize: 14}}>
          Phòng đầy đủ tiện nghi
        </Text>
        <View style={styles.line} />

        <CustomTextTitle label={'Lưu ý cho người thuê'} />
        <Text style={{color: 'black', fontSize: 14}}>
          Lưu ý đi nghủ sớm tránh ảnh hưởng người khác
        </Text>

        <View style={styles.line} />

        <View style={{height: 56}} />
      </ScrollView>
      <CustomButtonBottom
        label={'Thêm phòng mới'}
        onPress={() => navigation.navigate('AddRoom')}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
  line: {
    height: 1,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'black',
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
