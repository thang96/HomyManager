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
import CustomAppBar from '../../../Components/CommonComponent/CustomAppBar';
import CustomButton from '../../../Components/CommonComponent/CustomButton';
import {ScrollView} from 'react-native-virtualized-view';
import {colors, icons, images} from '../../../Constants';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import RenderService from '../../../Components/ComponentHome/RenderService';
import RenderAmenity from '../../../Components/ComponentHome/RenderAmenity';
import {uuid} from '../../../utils/uuid';
import CustomInput from '../../../Components/CommonComponent/CustomInput';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import CustomTwoButtonBottom from '../../../Components/CommonComponent/CustomTwoButtonBottom';
import CustomModalCamera from '../../../Components/CommonComponent/CustomModalCamera';
import ImagePicker from 'react-native-image-crop-picker';
import CustomInputValue from '../../../Components/CustomInputValue';

const AddRoom = () => {
  const navigation = useNavigation();
  const [albumImage, setAlbumImage] = useState([]);
  const [modalCamera, setModalCamera] = useState(false);
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
      <RenderService
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
      <RenderAmenity
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
      <CustomAppBar
        iconLeft={icons.ic_back}
        label={'Thêm phòng'}
        iconRight={icons.ic_bell}
        iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
      />
      <ScrollView style={{paddingHorizontal: 10, paddingTop: 10}}>
        <Text style={styles.content}>
          Vui lòng điền đầy đủ thông tin! Mục có dấu * là bắt buộc
        </Text>
        <CustomTextTitle label={'Thông tin phòng'} />
        <CustomInput
          important={true}
          type={'button'}
          title={'Tòa nhà'}
          placeholder={'Chọn tòa nhà'}
          onPress={() => {}}
        />
        <CustomInput
          important={true}
          keyboardType={'numeric'}
          type={'input'}
          styleViewInput={{marginTop: 10}}
          title={'Tầng'}
          placeholder={'Nhập số tầng'}
          value={''}
          onChangeText={text => {}}
        />
        <CustomInput
          important={true}
          type={'input'}
          styleViewInput={{marginTop: 10}}
          title={'Tên phòng'}
          placeholder={'Nhập tên phòng'}
          value={''}
          onChangeText={text => {}}
        />
        <CustomInput
          important={true}
          keyboardType={'numeric'}
          type={'input'}
          styleViewInput={{marginTop: 10}}
          title={'Giá thuê phòng'}
          placeholder={'Nhập giá thuê phòng'}
          value={''}
          onChangeText={text => {}}
        />
        <CustomInput
          important={true}
          type={'button'}
          styleViewInput={{marginTop: 10}}
          title={'Loại phòng'}
          placeholder={'Chọn loại phòng'}
          onPress={() => {}}
        />

        <CustomInputValue
          viewContainer={{marginTop: 20}}
          label={'Diện tích'}
          type={'input'}
          placeholder={'Nhập diện tích'}
          keyboardType={'numeric'}
          unit={'m2'}
        />

        <CustomInputValue
          viewContainer={{marginTop: 20}}
          label={'Giới hạn số người cho thuê'}
          type={'input'}
          placeholder={'Nhập số người'}
          keyboardType={'numeric'}
          unit={'Người'}
        />

        <CustomInputValue
          viewContainer={{marginTop: 20}}
          important={true}
          label={'Tiền đặt cọc'}
          type={'input'}
          placeholder={'Nhập số tiền cọc khi khách thuê'}
          keyboardType={'numeric'}
          unit={'VNĐ'}
        />

        <Text style={[styles.label, {marginTop: 10}]}>Mô tả</Text>
        <View style={styles.viewTextInput}>
          <TextInput placeholder={'Nhập mô tả phòng'} />
        </View>

        <Text style={[styles.label, {marginTop: 10}]}>
          Lưu ý cho người thuê
        </Text>
        <View style={styles.viewTextInput}>
          <TextInput placeholder={'Nhập lưu ý cho người thuê'} />
        </View>

        <View style={styles.line} />
        <CustomTextTitle label={'Dịch vụ có phí'} />
        <Text style={{fontSize: 13, color: '#7F8A93'}}>
          Chỉnh sửa dịch vụ phòng sẽ không ảnh hưởng đến dịch vụ của tòa nhà
        </Text>
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
        <Text style={{fontSize: 13, color: '#7F8A93'}}>
          Chỉnh sửa dịch vụ phòng sẽ không ảnh hưởng đến dịch vụ của tòa nhà
        </Text>
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

        <CustomTextTitle label={'Thêm hình ảnh'} />
        <View
          style={{
            height: 200,
            borderWidth: 0.5,
            borderColor: colors.mainColor,
            marginVertical: 5,
            borderRadius: 10,
          }}>
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
              label={'Tải lên ảnh phòng (1-6 ảnh)'}
              styleLabel={[styles.title, {marginTop: 5}]}
              disabled={true}
              icon={icons.ic_upload}
              styleIcon={{with: 100, height: 100, alignSelf: 'center'}}
            />
          )}
        </View>

        <CustomButton
          styleButton={[styles.buttonUploadIM]}
          label={'Tải lên ảnh phòng'}
          styleLabel={styles.labelUploadIM}
          onPress={() => setModalCamera(true)}
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
  content: {color: '#7F8A93', fontSize: 13},

  textTitle: {color: '#173b5f', fontSize: 16, fontWeight: 'bold'},
  label: {fontSize: 15, color: '#5f666b'},

  viewTextInput: {
    minHeight: 120,
    borderWidth: 1,
    backgroundColor: 'rgba(116,116,116,0.1)',
    borderRadius: 10,
    paddingHorizontal: 10,
    borderColor: colors.borderInput,
  },
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
});
export default AddRoom;
