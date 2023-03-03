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
  ImageBackground,
} from 'react-native';
import CustomButton from '../../../Components/CustomButton';
import {ScrollView} from 'react-native-virtualized-view';
import {colors, icons, images} from '../../../Constants';
import CustomViewInfor from '../../../Components/CustomViewInfor';
import CustomManagerInfor from '../../../Components/CustomPersonInfor';
import {FlatList} from 'react-native-gesture-handler';
import CustomPaidService from '../../../Components/CustomPaidService';
import CustomFreeService from '../../../Components/CustomFreeService';
import CustomAppBarBuildingInfor from '../../../Components/CustomAppBarBuildingInfor';
import CustomTextTitle from '../../../Components/CustomTextTitle';

const BuildingInformation = () => {
  const navigation = useNavigation();
  let avatar =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Ragdoll_Kater%2C_drei_Jahre_alt%2C_RAG_n_21_seal-tabby-colourpoint%2C_Januar_2015.JPG/330px-Ragdoll_Kater%2C_drei_Jahre_alt%2C_RAG_n_21_seal-tabby-colourpoint%2C_Januar_2015.JPG';

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
    <View style={styles.container}>
      <CustomAppBarBuildingInfor onPressLeft={() => navigation.goBack()} />
      <ScrollView style={{paddingHorizontal: 10, paddingTop: 20}}>
        <View style={styles.viewUtils}>
          <CustomOptionBT
            title={'Phòng'}
            content={'12'}
            icon={icons.ic_bed}
            styleImageBG={{tintColor: '#1297c0'}}
            styleBGIcon={{backgroundColor: '#ebf9fd'}}
            onPress={() => navigation.navigate('FloorInformation')}
          />
          <CustomOptionBT
            title={'Trống'}
            content={'8'}
            icon={icons.ic_key}
            styleImageBG={{tintColor: '#ff8d37'}}
            styleBGIcon={{backgroundColor: '#fff3e9'}}
          />
          <CustomOptionBT
            title={'Người'}
            content={'6'}
            icon={icons.ic_men}
            styleImageBG={{tintColor: '#7ace68'}}
            styleBGIcon={{backgroundColor: '#e6f6e2'}}
          />
          <CustomOptionBT
            title={'Sự cố'}
            content={'2'}
            icon={icons.ic_hammer}
            styleImageBG={{tintColor: '#f5dc00'}}
            styleBGIcon={{backgroundColor: '#fefdd9'}}
          />
        </View>

        <View style={styles.line} />

        <CustomTextTitle label={'Thông tin tòa nhà'} />
        <View style={[styles.viewRow, {marginBottom: 10}]}>
          <CustomViewInfor
            title={'Giờ mở cửa'}
            label={'08:00'}
            content={'AM'}
          />
          <CustomViewInfor
            title={'Giờ đóng cửa'}
            label={'23:00'}
            content={'PM'}
          />
        </View>
        <CustomViewInfor
          title={'Chi phí thuê'}
          label={'30000000'}
          content={'VNĐ'}
        />

        <View style={styles.line} />

        <CustomTextTitle label={'Quản lý tòa nhà'} />

        <CustomManagerInfor
          styleView={{marginTop: 10}}
          avatar={avatar}
          userName={'Trường Vân'}
          phoneNumber={`0123456789`}
          onPress={() => {}}
        />
        <CustomManagerInfor
          styleView={{marginTop: 10}}
          avatar={avatar}
          userName={'Trường Vân'}
          phoneNumber={`0123456789`}
          onPress={() => {}}
        />
        <CustomManagerInfor
          styleView={{marginTop: 10}}
          avatar={avatar}
          userName={'Trường Vân'}
          phoneNumber={`0123456789`}
          onPress={() => {}}
        />
        <View style={styles.line} />

        <CustomTextTitle label={'Thông tin thanh toán'} />

        <View style={[styles.viewRow, {marginBottom: 10}]}>
          <CustomViewInfor title={'Thời gian đóng tiền'} label={'Ngày 2'} />
          <CustomViewInfor title={'Hạn'} label={'Ngày 8'} />
        </View>
        <CustomViewInfor title={'Ngày chốt tiền'} label={'Ngày 28'} />

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

        <CustomTextTitle label={'Lưu ý'} />
        <Text style={{color: '#7F8A93', fontSize: 15, fontWeight: '400'}}>
          {
            'Ăn ở bẩn thịu hoặc làm ảnh hưởng người xung quanh sẽ bị đơn phương chấm dứt hợp đồng'
          }
        </Text>

        <View style={{marginBottom: 56}} />
      </ScrollView>
      <View style={styles.viewEdit}>
        <CustomButton
          label={'Chỉnh sửa'}
          styleLabel={styles.textEdit}
          styleButton={styles.styleButton}
        />
      </View>
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
    marginTop: 20,
    marginBottom: 10,
  },
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
  textPicker: {fontSize: 15, fontWeight: '400', color: 'rgba(254, 122, 55, 1)'},
  pickerTotal: {
    fontSize: 15,
    color: 'rgba(254, 122, 55, 1)',
    fontWeight: '600',
  },
  pickerTotal: {fontSize: 15, color: 'orange', fontWeight: 'bold'},
  styleButton: {
    height: 44,
    borderWidth: 2,
    width: 358,
    borderRadius: 5,
    borderColor: '#fe7a37',
  },
  textEdit: {color: '#fe7e3d', fontSize: 15, fontWeight: '400'},
  viewEdit: {
    height: 70,
    borderTopColor: 'grey',
    borderTopWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'white',
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
