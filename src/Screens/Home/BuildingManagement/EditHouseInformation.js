import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View, FlatList, Alert} from 'react-native';
import {
  GetDistrictByCityIdApi,
  GetLocationCitysApi,
  GetWardByDistrictIdApi,
  HauseDetailApi,
  PutBuildingApi,
} from '../../../Api/Home/BuildingApis/BuildingApis';
import {
  DeleteImageApi,
  PostImageBuildingApi,
} from '../../../Api/Home/FileDataApis/FileDataApis';
import {useSelector} from 'react-redux';
import {token} from '../../../Store/slices/tokenSlice';
import {colors, icons} from '../../../Constants';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import CustomAppBar from '../../../Components/CommonComponent/CustomAppBar';
import {ScrollView} from 'react-native-virtualized-view';
import CustomTimeButtons from '../../../Components/CommonComponent/CustomTimeButton';
import CustomInput from '../../../Components/CommonComponent/CustomInput';
import CustomInputValue from '../../../Components/CommonComponent/CustomInputValue';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import {StraightLine} from '../../../Components/CommonComponent/LineComponent';
import {convertDate, convertTime} from '../../../utils/common';
import RenderImage from '../../../Components/ComponentHome/RenderImage';
import CustomButton from '../../../Components/CommonComponent/CustomButton';
import CustomButtonValue from '../../../Components/CommonComponent/CustomButtonValue';
import CustomBankAccountInfor from '../../../Components/ComponentHome/BankAccount/CustomBankAccountInfor';
import RenderService from '../../../Components/ComponentHome/RenderService';
import RenderAmenity from '../../../Components/ComponentHome/RenderAmenity';
import CustomTwoButtonBottom from '../../../Components/CommonComponent/CustomTwoButtonBottom';
import CustomModalDateTimePicker from '../../../Components/CommonComponent/CustomModalDateTimePicker';
import CustomModalPicker from '../../../Components/CommonComponent/CustomModalPicker';
import CustomModalCamera from '../../../Components/CommonComponent/CustomModalCamera';
import ImagePicker from 'react-native-image-crop-picker';
import CustomPickerDay from '../../../Components/CommonComponent/CustomPickerDay';
import {
  BILLINGDATE,
  PAYMENTDATEFROM,
  PAYMENTDATETO,
} from '../../../Resource/DataPicker';
import {
  amenityState,
  bankAccountState,
  serviceState,
} from '../../../Store/slices/commonSlice';
import CustomModalNotify from '../../../Components/CommonComponent/CustomModalNotify';
import CustomNote from '../../../Components/CommonComponent/CustomNote';

const EditHouseInformation = props => {
  const route = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const hauseId = route.params;
  const tokenStore = useSelector(token);
  const bankAccountsStore = useSelector(bankAccountState);
  const servicesStore = useSelector(serviceState);
  const amenitysStore = useSelector(amenityState);
  const [hauseInfor, setHauseInfor] = useState(null);
  const [openTime, setOpenTime] = useState(new Date());
  const [closeTime, setCloseTime] = useState(new Date());
  const [listCity, setListCity] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWard, setListWard] = useState([]);
  const [albumImage, setAlbumImage] = useState([]);

  const [modalopenTime, setModalopenTime] = useState(false);
  const [modalcloseTime, setModalcloseTime] = useState(false);
  const [modalCity, setModalCity] = useState(false);
  const [modalDistrict, setModalDistrict] = useState(false);
  const [modalWard, setModalWard] = useState(false);
  const [modalCamera, setModalCamera] = useState(false);
  const [modalbillingDate, setModalbillingDate] = useState(false);
  const [modalpaymentDateTo, setModalpaymentDateTo] = useState(false);
  const [modalpaymentDateFrom, setModalpaymentDateFrom] = useState(false);
  const [modalNotify, setModalNotify] = useState(false);
  //   console.log(hauseInfor);
  useEffect(() => {
    const getDataHause = async () => {
      await GetLocationCitysApi(tokenStore)
        .then(res => {
          if (res?.status == 200) {
            setListCity(res?.data);
          }
        })
        .catch(error => console.log(error));
      await HauseDetailApi(tokenStore, hauseId)
        .then(res => {
          if (res?.status == 200) {
            let response = res?.data;
            setHauseInfor(response);
            setLoading(false);
          }
        })
        .catch(error => console.error(error));
    };
    getDataHause();
  }, []);

  const getDistrictData = async item => {
    setLoading(true);
    await GetDistrictByCityIdApi(tokenStore, item?.id)
      .then(res => {
        if (res?.status == 200) {
          setListDistrict(res?.data);
          setLoading(false);
        }
      })
      .catch(error => console.log(error));
  };

  const getWardData = async item => {
    setLoading(true);
    await GetWardByDistrictIdApi(tokenStore, item?.id)
      .then(res => {
        if (res?.status == 200) {
          setListWard(res?.data);
          setLoading(false);
        }
      })
      .catch(error => console.log(error));
  };

  const renderPaidSevice = (item, index) => {
    return (
      <RenderService
        name={item?.name}
        fee={item?.fee}
        calculateUnit={item?.calculateUnit}
      />
    );
  };

  const renderFreeSevice = (item, index) => {
    return <RenderAmenity label={item?.name} />;
  };

  const openCamera = () => {
    setModalCamera(false);
    ImagePicker.openCamera({width: 300, height: 400})
      .then(image => {
        let eachImg = {...image, uri: image?.path};
        let eachHauseImages = [...hauseInfor?.images, eachImg];
        let eachResult = {...hauseInfor, images: eachHauseImages};
        setHauseInfor(eachResult);
        let newAlbumImg = [...albumImage, eachImg];
        setAlbumImage(newAlbumImg);
      })
      .catch(e => {
        ImagePicker.clean();
        setModalCamera(false);
      });
  };

  const openGallery = () => {
    setModalCamera(false);
    ImagePicker.openPicker({multiple: true})
      .then(async image => {
        let albumImg = [];
        image.forEach(element => {
          let eachElement = {...element, uri: element?.path};
          albumImg.push(eachElement);
        });
        let eachHauseImages = [...hauseInfor?.images];
        let eachResult = eachHauseImages.concat(albumImg);
        let newHauseImage = {...hauseInfor, images: eachResult};
        setHauseInfor(newHauseImage);
        let eachAlbumImg = [...albumImage];
        let newAlbumImg = eachAlbumImg.concat(albumImg);
        setAlbumImage(newAlbumImg);
      })
      .catch(e => {
        ImagePicker.clean();
        setModalCamera(false);
      });
  };

  const renderImage = (item, index) => {
    return (
      <RenderImage
        data={item}
        deleteButton={true}
        deleteItem={() => {
          if (item?.id) {
            Alert.alert(
              'Cảnh báo !',
              'Đây là ảnh đang có trên server, bạn có muốn xóa ?',
              [
                {text: 'Cancel', style: 'cancel'},
                {
                  text: 'OK',
                  onPress: () => {
                    let result = [...hauseInfor?.images];
                    let newResult = result.filter(
                      itemResult => itemResult !== item,
                    );
                    let newHause = {...hauseInfor, images: newResult};
                    setHauseInfor(newHause);
                    deleteImage(item?.id);
                  },
                },
              ],
            );
          } else {
            let eachAlbumImg = [...albumImage];
            let newAlbumImg = eachAlbumImg.filter(
              itemResult => itemResult !== item,
            );
            setAlbumImage(newAlbumImg);
            let result = [...hauseInfor?.images];
            let newResult = result.filter(itemResult => itemResult !== item);
            let newHause = {...hauseInfor, images: newResult};
            setHauseInfor(newHause);
          }
        }}
      />
    );
  };

  const deleteImage = async imageId => {
    setLoading(true);
    await DeleteImageApi(tokenStore, imageId)
      .then(res => {
        if (res?.status == 200) {
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    let newHause = {...hauseInfor, bankAccount: bankAccountsStore};
    setHauseInfor(newHause);
  }, [bankAccountsStore]);

  useEffect(() => {
    let newHause = {...hauseInfor, chargeServices: servicesStore};
    setHauseInfor(newHause);
  }, [servicesStore]);

  useEffect(() => {
    let newHause = {...hauseInfor, amenities: amenitysStore};
    setHauseInfor(newHause);
  }, [amenitysStore]);

  const editBuildingInfor = async () => {
    setModalNotify(false);
    // setLoading(true);
    let serviceIds = [];
    let amenityIds = [];
    hauseInfor?.chargeServices.forEach(element => {
      serviceIds.push(element.id);
    });
    hauseInfor?.amenities.forEach(element => {
      amenityIds.push(element.id);
    });
    // console.log(serviceIds, '----', amenityIds);
    // let data = {
    //   name: hauseInfor?.name,
    //   numberOfFloor: parseInt(hauseInfor?.numberOfFloor),
    //   openTime: hauseInfor?.openTime,
    //   closeTime: hauseInfor?.closeTime,
    //   leasingFee: parseInt(hauseInfor?.leasingFee),
    //   description: hauseInfor?.description,
    //   billingDate: parseInt(hauseInfor?.billingDate),
    //   paymentDateFrom: parseInt(hauseInfor?.paymentDateFrom),
    //   paymentDateTo: parseInt(hauseInfor?.paymentDateTo),
    //   notice: hauseInfor?.notice,
    //   billNotice: hauseInfor?.billNotice,
    //   address: hauseInfor?.address,
    //   cityId: hauseInfor?.city?.id,
    //   districtId: hauseInfor?.district?.id,
    //   wardId: hauseInfor?.ward?.id,
    //   bankAccountId: hauseInfor?.bankAccount?.id,
    //   serviceIds: ['3fa85f64-5717-4562-b3fc-2c963f66afa6'],
    //   amenityIds: ['3fa85f64-5717-4562-b3fc-2c963f66afa6'],
    // };
    // await PutBuildingApi(tokenStore, hauseId, data)
    //   .then(async res => {
    //     if (res?.status == 200) {
    //       if (albumImage.length > 0) {
    //         await PostImageBuildingApi(tokenStore, hauseId, albumImage)
    //           .then(res => {
    //             if (res?.status == 200) {
    //               dispatch(updateStatus(false));
    //               setLoading(false);
    //               navigation.navigate('BuildingManager');
    //             }
    //           })
    //           .catch(error => {
    //             alert(error, 'error post img');
    //           });
    //       } else {
    //         dispatch(updateStatus(false));
    //         setLoading(false);
    //         navigation.navigate('BuildingManager');
    //       }
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error, 'edit house');
    //   });
  };

  return (
    <View style={styles.container}>
      {loading && <CustomLoading />}
      {modalopenTime && (
        <CustomModalDateTimePicker
          onCancel={() => setModalopenTime(false)}
          value={openTime}
          mode={'time'}
          openPicker={modalopenTime}
          onDateChange={value => {
            let newHause = {...hauseInfor, openTime: value};
            setHauseInfor(newHause);
          }}
          onPress={() => setModalopenTime(false)}
        />
      )}
      {modalcloseTime && (
        <CustomModalDateTimePicker
          onCancel={() => setModalcloseTime(false)}
          value={closeTime}
          mode={'time'}
          openPicker={modalcloseTime}
          onDateChange={value => {
            let newHause = {...hauseInfor, closeTime: value};
            setHauseInfor(newHause);
          }}
          onPress={() => setModalcloseTime(false)}
        />
      )}
      {modalCity && (
        <CustomModalPicker
          modalVisible={modalCity}
          data={listCity}
          pressClose={() => setModalCity(false)}
          onPressItem={item => {
            setModalCity(false);
            let newHause = {
              ...hauseInfor,
              city: item,
              district: null,
              ward: null,
            };
            setHauseInfor(newHause);
            getDistrictData(item);
          }}
        />
      )}
      {modalDistrict && (
        <CustomModalPicker
          modalVisible={modalDistrict}
          data={listDistrict}
          pressClose={() => setModalDistrict(false)}
          onPressItem={item => {
            setModalCity(false);
            let newHause = {
              ...hauseInfor,
              district: item,
              ward: null,
            };
            setHauseInfor(newHause);
            setModalDistrict(false);
            getWardData(item);
          }}
        />
      )}
      {modalWard && (
        <CustomModalPicker
          modalVisible={modalWard}
          data={listWard}
          pressClose={() => setModalWard(false)}
          onPressItem={item => {
            let newHause = {
              ...hauseInfor,
              ward: item,
            };
            setHauseInfor(newHause);
            setModalWard(false);
          }}
        />
      )}
      {modalCamera && (
        <CustomModalCamera
          openCamera={() => openCamera()}
          openGallery={() => openGallery()}
          modalVisible={modalCamera}
          onRequestClose={() => setModalCamera(false)}
          cancel={() => setModalCamera(false)}
        />
      )}
      {modalbillingDate && (
        <CustomPickerDay
          data={BILLINGDATE}
          modalVisible={modalbillingDate}
          onRequestClose={() => setModalbillingDate(false)}
          onPress={item => {
            let newHause = {...hauseInfor, billingDate: item?.value};
            setHauseInfor(newHause);
            setModalbillingDate(false);
          }}
        />
      )}
      {modalpaymentDateTo && (
        <CustomPickerDay
          data={PAYMENTDATETO}
          modalVisible={modalpaymentDateTo}
          onRequestClose={() => setModalpaymentDateTo(false)}
          onPress={item => {
            let newHause = {...hauseInfor, paymentDateTo: item?.value};
            setHauseInfor(newHause);
            setModalpaymentDateTo(false);
          }}
        />
      )}
      {modalpaymentDateFrom && (
        <CustomPickerDay
          data={PAYMENTDATEFROM}
          modalVisible={modalpaymentDateFrom}
          onRequestClose={() => setModalpaymentDateFrom(false)}
          onPress={item => {
            let newHause = {...hauseInfor, paymentDateFrom: item?.value};
            setHauseInfor(newHause);
            setModalpaymentDateFrom(false);
          }}
        />
      )}
      {modalNotify && (
        <CustomModalNotify
          title={'Sửa tòa nhà'}
          label={'Bạn có muốn sửa thông tin tòa nhà này ?'}
          modalVisible={modalNotify}
          onRequestClose={() => setModalNotify(false)}
          pressConfirm={() => editBuildingInfor()}
        />
      )}
      <CustomAppBar
        iconLeft={icons.ic_back}
        label={'Sửa thông tin tòa nhà'}
        iconRight={icons.ic_bell}
        pressIconRight={() => navigation.navigate('NotificationScreen')}
        iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
      />
      <ScrollView style={{paddingHorizontal: 10, marginTop: 10}}>
        <CustomTextTitle label={'Thông tin tòa nhà'} />
        <CustomInput
          important={true}
          type={'input'}
          title={'Tên tòa nhà'}
          placeholder={'Nhập tên tòa nhà'}
          defaultValue={hauseInfor?.name}
          onEndEditing={evt => {
            let newHause = {...hauseInfor, name: evt.nativeEvent.text};
            setHauseInfor(newHause);
          }}
        />
        <CustomInput
          important={true}
          keyboardType={'numeric'}
          type={'input'}
          styleViewInput={{marginTop: 10}}
          title={'Số tầng'}
          placeholder={'Nhập số tầng'}
          defaultValue={`${hauseInfor?.numberOfFloor}`}
          onEndEditing={evt => {
            let newHause = {...hauseInfor, numberOfFloor: evt.nativeEvent.text};
            setHauseInfor(newHause);
          }}
        />
        <CustomTimeButtons
          styleContainer={{marginTop: 10}}
          title={'Giờ mở - đóng cửa'}
          leftLabel={'Từ'}
          rightLabel={'Đến'}
          styleButtonLeft={{marginRight: 5}}
          styleButtonRight={{marginLeft: 5}}
          valueLeft={`${convertTime(hauseInfor?.openTime)}`}
          valueRight={`${convertTime(hauseInfor?.closeTime)}`}
          onPressLeft={() => setModalopenTime(true)}
          onPressRightt={() => setModalcloseTime(true)}
        />
        <CustomInputValue
          viewContainer={{marginTop: 10}}
          type={'input'}
          label={'Chi phí thuê nhà'}
          important={true}
          unit={'VNĐ'}
          placeholder={'Nhập chi phí thuê nhà'}
          keyboardType={'numeric'}
          defaultValue={`${hauseInfor?.leasingFee}`}
          onEndEditing={evt => {
            let newHause = {...hauseInfor, leasingFee: evt.nativeEvent.text};
            setHauseInfor(newHause);
          }}
        />

        <CustomNote
          viewCustom={{marginTop: 10}}
          title={'Mô tả'}
          placeholder="Nhập mô tả cho tòa nhà"
          defaultValue={hauseInfor?.description}
          onEndEditing={evt => {
            let newHause = {...hauseInfor, description: evt.nativeEvent.text};
            setHauseInfor(newHause);
          }}
        />

        {StraightLine()}
        <CustomTextTitle label={'Địa chỉ tòa nhà'} />
        <CustomInput
          type={'button'}
          styleViewInput={{marginTop: 10}}
          title={'Tỉnh/ Thành phố'}
          placeholder={'Chọn Tỉnh/ Thành phố'}
          value={hauseInfor?.city?.name}
          onPress={() => setModalCity(true)}
        />
        <CustomInput
          type={'button'}
          styleViewInput={{marginTop: 10}}
          title={'Quận/ Huyện'}
          placeholder={'Chọn Quận/ Huyện'}
          value={hauseInfor?.district?.name}
          onPress={() => setModalDistrict(true)}
        />
        <CustomInput
          type={'button'}
          styleViewInput={{marginTop: 10}}
          title={'Phường/ Xã'}
          placeholder={'Chọn Phường/ Xã'}
          value={hauseInfor?.ward?.name}
          onPress={() => setModalWard(true)}
        />
        <CustomNote
          viewCustom={{marginTop: 10}}
          title={'Địa chỉ cụ thể'}
          placeholder="Nhập địa chỉ cụ thể"
          defaultValue={hauseInfor?.address}
          onEndEditing={evt => {
            let newHause = {...hauseInfor, address: evt.nativeEvent.text};
            setHauseInfor(newHause);
          }}
        />

        <CustomTextTitle label={'Thêm hình ảnh'} />
        <View style={styles.viewRenderImg}>
          {hauseInfor?.images?.length > 0 ? (
            <FlatList
              horizontal
              data={hauseInfor?.images}
              keyExtractor={(key, index) => `keyImg${index}`}
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

        <CustomTextTitle label={'Thiết lập tiền nhà'} />

        <CustomButtonValue
          important={true}
          icon={icons.ic_down}
          type={'button'}
          title={'Ngày chốt tiền'}
          placeholder={'Chọn ngày'}
          value={
            hauseInfor?.billingDate == 0
              ? 'Cuối tháng'
              : hauseInfor?.billingDate == -1
              ? 'Ngày 1 tháng sau'
              : ''
          }
          onPress={() => setModalbillingDate(true)}
        />

        <CustomTimeButtons
          styleContainer={{marginTop: 20}}
          title={'Thời gian nộp tiền phòng'}
          leftLabel={'Từ ngày'}
          rightLabel={'Đến ngày'}
          iconLeft={icons.ic_down}
          iconRight={icons.ic_down}
          styleButtonLeft={{marginRight: 5}}
          styleButtonRight={{marginLeft: 5}}
          valueLeft={hauseInfor?.paymentDateFrom}
          valueRight={hauseInfor?.paymentDateTo}
          onPressLeft={() => setModalpaymentDateFrom(true)}
          onPressRightt={() => setModalpaymentDateTo(true)}
        />

        <CustomTextTitle
          label={'Thông tin thanh toán'}
          labelButton={'Thêm'}
          icon={icons.ic_plus}
          onPress={() => {
            navigation.navigate('ListPaymentSelect');
          }}
        />
        {hauseInfor?.bankAccount && (
          <CustomBankAccountInfor
            viewCustom={{marginBottom: 10}}
            imageUrl={hauseInfor?.bankAccount?.bank?.logo}
            userName={hauseInfor?.bankAccount?.name}
            accountNo={hauseInfor?.bankAccount?.accountNo}
          />
        )}
        <CustomTextTitle
          label={'Dịch vụ có phí'}
          labelButton={'Thêm'}
          icon={icons.ic_plus}
          onPress={() => navigation.navigate('Service')}
        />

        {hauseInfor?.chargeServices?.length > 0 ? (
          <FlatList
            listKey="listService"
            horizontal={false}
            scrollEnabled={false}
            numColumns={2}
            keyExtractor={(key, index) => `chargeServices${index.toString()}`}
            data={hauseInfor?.chargeServices}
            renderItem={({item, index}) => renderPaidSevice(item, index)}
          />
        ) : null}

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textPicker}>Đã chọn </Text>
          <Text
            style={
              styles.pickerTotal
            }>{`${hauseInfor?.chargeServices?.length}`}</Text>
        </View>
        {StraightLine()}
        <CustomTextTitle
          label={'Tiện ích miễn phí'}
          labelButton={'Thêm'}
          icon={icons.ic_plus}
          onPress={() => navigation.navigate('Utilities')}
        />

        {hauseInfor?.amenities?.length > 0 ? (
          <FlatList
            listKey="listAmenity"
            style={{justifyContent: 'space-between'}}
            horizontal={false}
            scrollEnabled={false}
            numColumns={2}
            keyExtractor={(key, index) => `listAmenity${index.toString()}`}
            data={hauseInfor?.amenities}
            renderItem={({item, index}) => renderFreeSevice(item, index)}
          />
        ) : null}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textPicker}>Đã chọn </Text>
          <Text
            style={
              styles.pickerTotal
            }>{`${hauseInfor?.amenities?.length}`}</Text>
        </View>
        {StraightLine()}
        <CustomTextTitle label={'Lưu ý'} />

        <CustomNote
          title={'Lưu ý của tòa nhà'}
          placeholder="Nhập lưu ý của tòa nhà"
          defaultValue={hauseInfor?.notice}
          onEndEditing={evt => {
            let newHause = {...hauseInfor, notice: evt.nativeEvent.text};
            setHauseInfor(newHause);
          }}
        />
        <CustomNote
          viewCustom={{marginTop: 10}}
          title={'Ghi chú hóa đơn'}
          placeholder="Nhập ghi chú hóa đơn"
          defaultValue={hauseInfor?.billNotice}
          onEndEditing={evt => {
            let newHause = {...hauseInfor, billNotice: evt.nativeEvent.text};
            setHauseInfor(newHause);
          }}
        />

        <View style={{height: 56}} />
        <CustomTwoButtonBottom
          leftLabel={'Trở lại'}
          rightLabel={'Hoàn tất'}
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => setModalNotify(true)}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
  viewTextInput: {
    paddingHorizontal: 10,
    borderWidth: 1,
    marginTop: 5,
    borderRadius: 10,
    borderColor: '#e2e5e6',
    height: 120,
    backgroundColor: 'white',
  },
  label: {fontSize: 15, color: '#374047'},
  viewRenderImg: {
    height: 220,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  buttonUploadIM: {
    height: 50,
    backgroundColor: colors.mainColor,
    borderRadius: 10,
  },
  labelUploadIM: {color: 'white', fontWeight: '500', fontSize: 15},
  textPicker: {fontSize: 11, fontWeight: '400', color: 'rgba(254, 122, 55, 1)'},
  pickerTotal: {
    fontSize: 15,
    color: 'rgba(254, 122, 55, 1)',
    fontWeight: '600',
  },
});
export default EditHouseInformation;
