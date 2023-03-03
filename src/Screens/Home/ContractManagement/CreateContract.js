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
import CustomInputValue from '../../../Components/CustomInputValue';
import CustomManagerInfor from '../../../Components/CustomPersonInfor';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import CustomTextTitle from '../../../Components/CustomTextTitle';
import CustomPaidService from '../../../Components/CustomPaidService';
import CustomFreeService from '../../../Components/CustomFreeService';
import {uuid} from '../../../utils/uuid';
import CustomInput from '../../../Components/CustomInput';
import CustomTimeButtons from '../../../Components/CustomTimeButton';
import CustomModalDateTimePicker from '../../../Components/CustomModalDateTimePicker';
import CustomTwoButtonBottom from '../../../Components/CustomTwoButtonBottom';
import ImagePicker from 'react-native-image-crop-picker';
import CustomModalCamera from '../../../Components/CustomModalCamera';
import CustomSuggest from '../../../Components/CustomSuggest';

const CreateContract = () => {
  const navigation = useNavigation();
  const [toDay, setToDay] = useState(new Date());
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [albumImage, setAlbumImage] = useState([]);

  const [toDayValue, setToDayValue] = useState('');
  const [fromDateValue, setFromDateValue] = useState('');
  const [toDateValue, setToDateValue] = useState('');
  const [modalFromDate, setModalFromDate] = useState(false);
  const [modalToDate, setModalToDate] = useState(false);
  const [modalCamera, setModalCamera] = useState(false);

  function dateToYMD(value) {
    var d = value.getDate();
    var m = value.getMonth() + 1; //Month from 0 to 11
    var y = value.getFullYear();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  }
  useEffect(() => {
    let newToday = dateToYMD(toDay);
    setToDayValue(newToday);
    setFromDateValue(newToday);
    setToDateValue(newToday);
  }, []);

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

  const openCamera = () => {
    ImagePicker.openCamera({width: 300, height: 400})
      .then(image => {
        let eachImg = {...image, uri: image?.path};
        addResult(eachImg);
        setModalCamera(false);
      })
      .catch(e => {
        ImagePicker.clean();
        setModalCamera(false);
      });
  };

  const openGallery = () => {
    ImagePicker.openPicker({multiple: true})
      .then(async image => {
        let albumImg = [];
        for (let index = 0; index < image.length; index++) {
          let element = image[index];
          let eachElement = {...element, uri: element?.path};
          albumImg.push(eachElement);
        }
        addResultGallery(albumImg);
        setModalCamera(false);
      })
      .catch(e => {
        ImagePicker.clean();
        setModalCamera(false);
      });
  };

  const addResultGallery = album => {
    const eachResult = [...albumImage];
    const newResult = eachResult.concat(album);
    setAlbumImage(newResult);
  };
  const addResult = image => {
    const eachResult = [...albumImage, image];
    setAlbumImage(eachResult);
  };

  const renderImage = (item, index) => {
    return (
      <View>
        <View style={styles.viewRender}>
          <CustomButton
            onPress={() => deleteItem(item, index)}
            styleButton={styles.customButtonIcon}
            styleIcon={styles.imageStyle}
            icon={icons.ic_circle}
          />
          <Image
            source={{uri: item?.uri}}
            style={{width: 180, height: 180, marginHorizontal: 5}}
            resizeMode={'contain'}
          />
        </View>
      </View>
    );
  };
  const deleteItem = (item, index) => {
    let result = [...albumImage];
    let newResult = result.filter(itemResult => itemResult !== item);

    setAlbumImage(newResult);
  };

  return (
    <View style={styles.container}>
      {modalCamera && (
        <CustomModalCamera
          openCamera={() => openCamera()}
          openGallery={() => openGallery()}
          modalVisible={modalCamera}
          onRequestClose={() => setModalCamera(false)}
          cancel={() => setModalCamera(false)}
        />
      )}
      {modalFromDate && (
        <CustomModalDateTimePicker
          onCancel={() => setModalFromDate(false)}
          value={fromDate}
          mode={'date'}
          openPicker={modalFromDate}
          onDateChange={value => {
            let newToday = dateToYMD(value);
            setFromDate(value);
            setFromDateValue(newToday);
          }}
          onPress={() => setModalFromDate(false)}
        />
      )}
      {modalToDate && (
        <CustomModalDateTimePicker
          onCancel={() => setModalToDate(false)}
          value={toDay}
          mode={'date'}
          openPicker={modalToDate}
          onDateChange={value => {
            let newToday = dateToYMD(value);
            setToDate(value);
            setToDateValue(newToday);
          }}
          onPress={() => setModalToDate(false)}
        />
      )}
      <CustomAppBar
        iconLeft={icons.ic_back}
        label={'Tạo hợp đồng'}
        iconRight={icons.ic_bell}
        iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
      />
      <ScrollView style={{paddingHorizontal: 10, paddingTop: 10}}>
        <CustomSuggest
          label={'Vui lòng điền đầy đủ thông tin! Mục có dấu * là bắt buộc'}
        />
        <CustomTextTitle label={'Thông tin hợp đồng'} />
        <CustomInput
          important={true}
          type={'button'}
          styleViewInput={{marginTop: 10}}
          title={'Tòa nhà'}
          placeholder={'Chọn tòa nhà'}
          onPress={() => {}}
        />
        <CustomInput
          important={true}
          type={'button'}
          styleViewInput={{marginTop: 20}}
          title={'Phòng'}
          placeholder={'Chọn phòng'}
          onPress={() => {}}
        />
        <CustomInput
          important={true}
          type={'button'}
          styleViewInput={{marginTop: 20}}
          title={'Đại diện người cho thuê'}
          placeholder={'Chọn đại diện người cho thuê'}
          onPress={() => {}}
        />

        <CustomTimeButtons
          styleContainer={{marginTop: 20}}
          title={'Thời gian nộp tiền phòng'}
          leftLabel={'Từ'}
          rightLabel={'Đến'}
          styleButtonLeft={{marginRight: 5}}
          styleButtonRight={{marginLeft: 5}}
          valueLeft={fromDateValue}
          valueRight={toDateValue}
          onPressLeft={() => setModalFromDate(true)}
          onPressRightt={() => setModalToDate(true)}
        />

        <CustomInput
          important={true}
          type={'button'}
          styleViewInput={{marginTop: 20}}
          title={'Ngày bắt đầu tính tiền'}
          placeholder={'09/02/2023'}
          onPress={() => {}}
        />

        <CustomInput
          important={true}
          type={'button'}
          styleViewInput={{marginTop: 20}}
          title={'Kỳ thanh toán tiền phòng'}
          placeholder={`${1} tháng`}
          onPress={() => {}}
        />

        <CustomTextTitle label={'Tiền phòng'} />
        <CustomInputValue
          type={'button'}
          label={'Tiền thuê phòng'}
          important={true}
          value={'1500000'}
          unit={'VNĐ'}
        />
        <CustomInputValue
          viewContainer={{marginTop: 20}}
          type={'button'}
          label={'Tiền cọc'}
          important={true}
          value={'500000'}
          unit={'VNĐ'}
        />

        <View style={styles.line} />

        <CustomTextTitle
          label={'Đại diện người cho thuê'}
          labelButton={'Thêm mới'}
        />

        <View style={styles.line} />

        <CustomTextTitle label={'Dịch vụ có phí'} labelButton={'Thêm mới'} />

        <CustomSuggest
          label={'Chọn dịch vụ tính phí đã có hoặc thêm mới dịch vụ'}
        />

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

        <CustomTextTitle label={'Tiện ích miễn phí'} labelButton={'Thêm mới'} />

        <CustomSuggest
          label={'Chọn tiện ích miễn phí đã có hoặc thêm mới tiện ích'}
        />
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

        <CustomTextTitle label={'Thêm ảnh hợp đồng'} />
        <View style={styles.viewShowImage}>
          {albumImage.length > 0 ? (
            <FlatList
              horizontal
              data={albumImage}
              keyExtractor={uuid}
              renderItem={({item}) => renderImage(item)}
            />
          ) : (
            <CustomButton
              styleButton={{flex: 1}}
              label={'Tải lên ảnh hợp đồng ( tối đa 10 ảnh )'}
              styleLabel={[styles.title, {marginTop: 5}]}
              disabled={true}
              icon={icons.ic_upload}
              styleIcon={{with: 100, height: 100, alignSelf: 'center'}}
            />
          )}
        </View>

        <CustomButton
          styleButton={[styles.buttonUploadIM]}
          label={'Tải lên ảnh hợp đồng'}
          styleLabel={styles.labelUploadIM}
          onPress={() => setModalCamera(true)}
        />

        <View style={styles.line} />

        <CustomTextTitle
          label={'Danh sách người thuê'}
          labelButton={'Thêm mới'}
          onPress={() => navigation.navigate('TenantList')}
        />

        <View style={{height: 56}} />
      </ScrollView>
      <CustomTwoButtonBottom
        leftLabel={'Trở lại'}
        rightLabel={'Tiếp tục'}
        onPressLeft={() => navigation.goBack()}
        onPressRight={() => {
          console.log('Ok');
        }}
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
  textPicker: {fontSize: 15, fontWeight: '400', color: 'rgba(254, 122, 55, 1)'},
  pickerTotal: {
    fontSize: 15,
    color: 'rgba(254, 122, 55, 1)',
    fontWeight: '600',
  },
  buttonUploadIM: {
    height: 50,
    backgroundColor: colors.mainColor,
    borderRadius: 10,
  },
  labelUploadIM: {color: 'white', fontWeight: '500', fontSize: 15},
  customButtonIcon: {position: 'absolute', right: 3, top: 3, zIndex: 1},
  imageStyle: {width: 20, height: 20, tintColor: 'red'},
  viewRender: {
    height: 210,
    width: 210,
    borderWidth: 0.5,
    borderColor: colors.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 10,
  },
  viewShowImage: {
    height: 200,
    borderWidth: 0.5,
    borderColor: colors.mainColor,
    marginVertical: 5,
    borderRadius: 10,
  },
});
export default CreateContract;
