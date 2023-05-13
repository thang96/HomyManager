import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomAppBar from '../../../Components/CommonComponent/CustomAppBar';
import {colors, icons, images} from '../../../Constants';
import CustomButtonValue from '../../../Components/CommonComponent/CustomButtonValue';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import CustomPersonInfor from '../../../Components/CommonComponent/CustomPersonInfor';
import CustomIndexInput from '../../../Components/ComponentHome/WaterAndElectricity/CustomIndexInput';
import {formatNumber, validateNumber} from '../../../utils/common';
import CustomButton from '../../../Components/CommonComponent/CustomButton';
import ImagePicker from 'react-native-image-crop-picker';
import CustomModalCamera from '../../../Components/CommonComponent/CustomModalCamera';
import CustomTwoButtonBottom from '../../../Components/CommonComponent/CustomTwoButtonBottom';
import {useNavigation, useRoute} from '@react-navigation/native';
import {GetDetailInvoiceUnClosingsApi} from '../../../Api/Home/WaterAndElectricityApis/WaterAndElectricityApis';
import {useDispatch, useSelector} from 'react-redux';
import {token} from '../../../Store/slices/tokenSlice';
import {updateStatus} from '../../../Store/slices/statusSlice';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import {PutInvoiceUnClosingsApi} from '../../../Api/Home/WaterAndElectricityApis/WaterAndElectricityApis';
const widthView = Dimensions.get('window').width / 2 - 15;

const ConfirmWaterAndElectricity = props => {
  const navigation = useNavigation();
  const tokenStore = useSelector(token);
  const dispatch = useDispatch();
  const route = useRoute();
  const confirmId = route.params;
  const [modalShowImage, setModalShowImage] = useState(false);
  const [modalCamera, setModalCamera] = useState(false);

  const [loading, setLoading] = useState(true);
  const [progressiveServiceClosings, setProgressiveServiceClosings] =
    useState();
  const [indexValue, setIndexValue] = useState();
  const [selectedPhoto, setSelectedPhoto] = useState();

  useEffect(() => {
    const getData = async () => {
      await GetDetailInvoiceUnClosingsApi(tokenStore, confirmId)
        .then(res => {
          if (res?.status == 200) {
            let data = res?.data?.progressiveServiceClosings;
            let array = [];
            for (let index = 0; index < data.length; index++) {
              const element = data[index];
              let newElement = {
                ...element,
                imageUsageNumber: null,
                // thisStageUsageNumber: '',
              };
              array.push(newElement);
            }
            setProgressiveServiceClosings(array);
            setLoading(false);
          }
        })
        .catch(error => {
          console.log(error);
        });
    };
    getData();
  }, []);

  const openCamera = () => {
    setModalCamera(false);
    ImagePicker.openCamera({width: 300, height: 400})
      .then(image => {
        let eachImage = {...image, uri: image?.path};
        let eachValue = [...progressiveServiceClosings];
        eachValue[indexValue] = {
          ...eachValue[indexValue],
          imageUsageNumber: eachImage,
        };
        setProgressiveServiceClosings(eachValue);
      })
      .catch(e => {
        ImagePicker.clean();
        setModalCamera(false);
      });
  };

  const openGallery = () => {
    setModalCamera(false);
    ImagePicker.openPicker({multiple: false})
      .then(image => {
        let eachImage = {...image, uri: image?.path};
        let eachValue = [...progressiveServiceClosings];
        eachValue[indexValue] = {
          ...eachValue[indexValue],
          imageUsageNumber: eachImage,
        };
        setProgressiveServiceClosings(eachValue);
      })
      .catch(e => {
        ImagePicker.clean();
        setModalCamera(false);
      });
  };

  const saveInvoiceClosings = async () => {
    setLoading(true);
    let array = [];
    for (let index = 0; index < progressiveServiceClosings.length; index++) {
      const element = progressiveServiceClosings[index];
      let thisStageUsageNumber = parseInt(
        `${validateNumber(`${element?.thisStageUsageNumber}`)}`,
      );
      let previousStageUsageNumber = parseInt(
        `${validateNumber(`${element?.previousStageUsageNumber}`)}`,
      );
      let subtract = thisStageUsageNumber - previousStageUsageNumber;
      if (subtract < 0) {
        Alert.alert('Có lỗi sảy ra', 'Vui lòng kiểm tra lại thông tin đã nhập');
        break;
      }
      let object = {
        id: element?.id,
        thisStageUsageAmount: subtract,
        thisStageUsageNumber: parseInt(`${element?.thisStageUsageNumber}`),
      };
      array.push(object);
    }
    const data = {progressiveServiceClosings: array};
    if (array?.length == progressiveServiceClosings?.length) {
      await PutInvoiceUnClosingsApi(tokenStore, data, confirmId)
        .then(res => {
          if (res?.status == 200) {
            dispatch(updateStatus('updateInvoiceClosings'));
            navigation.navigate('WaterAndElectricityManager');
            setLoading(false);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  const goToConfirmInvoiceClosings = async () => {};

  return (
    <View style={styles.container}>
      {loading && <CustomLoading />}
      {modalShowImage && (
        <ModalshowImage
          modalVisible={modalShowImage}
          onRequestClose={() => setModalShowImage(false)}
          pressClose={() => setModalShowImage(false)}
          data={selectedPhoto}
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

      <CustomAppBar
        iconLeft={icons.ic_back}
        pressIconLeft={() => navigation.goBack()}
        label={'Chốt điện nước'}
      />
      <View style={{paddingHorizontal: 10}}>
        <CustomButtonValue
          styleView={{marginVertical: 10}}
          type={'button'}
          icon={icons.ic_businessOutline}
          placeholder={'Chọn tòa nhà'}
          value={'Tòa nhà D2'}
        />
      </View>
      <ScrollView
        nestedScrollEnabled={true}
        keyboardDismissMode="none"
        style={styles.scrollView}>
        <CustomTextTitle label={'Người đại diện'} />
        <CustomPersonInfor
          avatar={icons.ic_user}
          userName={'Nguyen Van A'}
          phoneNumber={'123456789'}
        />
        <View>
          <ScrollView horizontal={true} style={{width: '100%'}}>
            {progressiveServiceClosings?.length > 0 && (
              <FlatList
                data={progressiveServiceClosings}
                keyExtractor={key => key?.id}
                renderItem={({item, index}) => {
                  return (
                    <View>
                      <CustomTextTitle label={`Chỉ số ${item?.serviceName}`} />
                      <View style={styles.viewBetween}>
                        <View>
                          <CustomIndexInput
                            title={'Số cũ'}
                            styleInput={{color: '#FE7A37'}}
                            editable={false}
                            unit={`${item?.calculateUnit}`}
                            value={`${formatNumber(
                              `${item?.previousStageUsageNumber}`,
                            )}`}
                          />
                          <TouchableOpacity
                            onPress={() => {
                              setSelectedPhoto(images?.im_frame1);
                              setModalShowImage(true);
                            }}
                            style={styles.buttonImage}>
                            <Image
                              resizeMode="contain"
                              style={{
                                width: '100%',
                                height: '100%',
                              }}
                              source={
                                item?.image?.fileUrl
                                  ? {uri: item?.image?.fileUrl}
                                  : images.im_frame1
                              }
                            />
                          </TouchableOpacity>
                        </View>

                        <View>
                          <CustomIndexInput
                            title={'Số mới'}
                            unit={`${item?.calculateUnit}`}
                            placeholder={'Nhập số'}
                            styleInput={{
                              color: colors.mainColor,
                              borderBottomWidth: 1,
                            }}
                            value={
                              item?.thisStageUsageNumber == 0
                                ? ''
                                : `${formatNumber(
                                    `${item?.thisStageUsageNumber}`,
                                  )}`
                            }
                            onChangeText={text => {
                              let newValue = {
                                ...item,
                                thisStageUsageNumber: text,
                              };
                              let newData = [...progressiveServiceClosings];
                              newData[index] = newValue;
                              setProgressiveServiceClosings(newData);
                            }}
                          />
                          {item?.imageUsageNumber ? (
                            <TouchableOpacity
                              onPress={() => {
                                setSelectedPhoto(item?.imageUsageNumber);
                                setModalShowImage(true);
                              }}
                              style={styles.buttonImage}>
                              <Image
                                resizeMode="contain"
                                style={{
                                  width: '100%',
                                  height: '100%',
                                }}
                                source={{uri: item?.imageUsageNumber?.uri}}
                              />
                              <CustomButton
                                styleButton={styles.buttonDeleteImage}
                                icon={icons.ic_close}
                                styleIcon={{
                                  width: 20,
                                  height: 20,
                                  tintColor: 'red',
                                }}
                                onPress={() => {
                                  let eachValue = [
                                    ...progressiveServiceClosings,
                                  ];
                                  eachValue[index] = {
                                    ...eachValue[index],
                                    imageUsageNumber: null,
                                  };
                                  setProgressiveServiceClosings(eachValue);
                                }}
                              />
                            </TouchableOpacity>
                          ) : (
                            <CustomButton
                              styleButton={[
                                styles.buttonImage,
                                styles.buttonPicture,
                              ]}
                              label={'Thêm ảnh'}
                              styleLabel={{color: colors.mainColor}}
                              icon={icons.ic_plus}
                              styleIcon={styles.addImageIcon}
                              onPress={() => {
                                setIndexValue(index);
                                setModalCamera(true);
                              }}
                            />
                          )}
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            )}
          </ScrollView>
        </View>

        <CustomTextTitle label={'Mức tiêu thụ tháng này'} />
        <View>
          <ScrollView horizontal={true} style={{width: '100%'}}>
            {progressiveServiceClosings?.length > 0 && (
              <FlatList
                data={progressiveServiceClosings}
                keyExtractor={key => key?.id}
                numColumns={2}
                renderItem={({item, index}) => {
                  return (
                    <View>
                      <CustomIndexInput
                        title={`Chỉ số ${item?.serviceName}`}
                        styleInput={{color: '#FE7A37'}}
                        editable={false}
                        unit={'kwh'}
                        value={
                          `${parseInt(`${item?.thisStageUsageNumber}`)}` -
                            `${parseInt(`${item?.previousStageUsageNumber}`)}` >
                          0
                            ? formatNumber(
                                `${
                                  `${parseInt(
                                    `${item?.thisStageUsageNumber}`,
                                  )}` -
                                  `${parseInt(
                                    `${item?.previousStageUsageNumber}`,
                                  )}`
                                }`,
                              )
                            : `${formatNumber(`${0}`)}`
                        }
                      />
                    </View>
                  );
                }}
              />
            )}
          </ScrollView>
        </View>

        <View style={{height: 56}} />
      </ScrollView>
      <CustomTwoButtonBottom
        leftLabel={'Lưu lại'}
        rightLabel={'Chốt dịch vụ'}
        styleLabelLeft={styles.styleLabelLeft}
        styleButtonLeft={styles.styleButtonLeft}
        onPressLeft={() => saveInvoiceClosings()}
        onPressRight={() => goToConfirmInvoiceClosings()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
  scrollView: {paddingHorizontal: 10, marginTop: 10},
  viewBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eachViewModal: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(1,1,1,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonClose: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 10,
  },
  buttonImage: {
    height: widthView * 0.6,
    width: widthView,
    marginTop: 10,
  },
  buttonPicture: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  addImageIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
    tintColor: colors.mainColor,
  },
  buttonDeleteImage: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 1,
  },
  styleLabelLeft: {
    color: colors.backgroundOrange,
    fontSize: 15,
    fontWeight: '600',
  },
  styleButtonLeft: {
    borderColor: colors.backgroundOrange,
    backgroundColor: 'white',
    marginRight: 5,
  },
});
export default ConfirmWaterAndElectricity;

const ModalshowImage = props => {
  const {modalVisible, onRequestClose, data, pressClose} = props;
  return (
    <View style={styles.viewModal}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onRequestClose}>
        <View style={styles.eachViewModal}>
          <Image
            source={
              data?.uri
                ? {uri: data?.uri}
                : data?.fileUrl
                ? {uri: data?.fileUrl}
                : data
                ? data
                : null
            }
            style={{width: '100%', height: '90%'}}
            resizeMode={'contain'}
          />
          <CustomButton
            onPress={pressClose}
            icon={icons.ic_close}
            styleIcon={{width: 15, height: 15, tintColor: 'red'}}
            styleButton={styles.buttonClose}
          />
        </View>
      </Modal>
    </View>
  );
};
