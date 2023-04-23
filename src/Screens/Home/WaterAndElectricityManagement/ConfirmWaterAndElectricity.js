import React, {useState} from 'react';
import {
  Dimensions,
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
import {formatNumber} from '../../../utils/common';
import CustomButton from '../../../Components/CommonComponent/CustomButton';
import ImagePicker from 'react-native-image-crop-picker';
import CustomModalCamera from '../../../Components/CommonComponent/CustomModalCamera';
import CustomTwoButtonBottom from '../../../Components/CommonComponent/CustomTwoButtonBottom';
const widthView = Dimensions.get('window').width / 2 - 15;

const ConfirmWaterAndElectricity = props => {
  const [showImageElectric, setShowImageElectric] = useState(false);
  const [showImageWater, setShowImageWater] = useState(false);
  const [electricityIndexImage, setElectricityIndexImage] = useState(null);
  const [waterIndexImage, setWaterIndexImage] = useState(null);

  const [modalShowElectricImage, setModalShowElectricImage] = useState(false);
  const [modalElectricCamera, setModalElectricCamera] = useState(false);
  const [modalShowWaterImage, setModalShowWaterImage] = useState(false);
  const [modalWarterCamera, setModalWarterCamera] = useState(false);

  let dataImg = images.im_frame1;
  let dataImgWater = images.im_frame2;
  const openCamera = () => {
    setModalElectricCamera(false);
    ImagePicker.openCamera({width: 300, height: 400})
      .then(image => {
        let eachImage = {...image, uri: image?.path};
        setElectricityIndexImage(eachImage);
      })
      .catch(e => {
        ImagePicker.clean();
        setModalElectricCamera(false);
      });
  };

  const openGallery = () => {
    setModalElectricCamera(false);
    ImagePicker.openPicker({multiple: false})
      .then(image => {
        let eachImage = {...image, uri: image?.path};
        setElectricityIndexImage(eachImage);
      })
      .catch(e => {
        ImagePicker.clean();
        setModalElectricCamera(false);
      });
  };
  const openCameraWater = () => {
    setModalWarterCamera(false);
    ImagePicker.openCamera({width: 300, height: 400})
      .then(image => {
        let eachImage = {...image, uri: image?.path};
        setWaterIndexImage(eachImage);
      })
      .catch(e => {
        ImagePicker.clean();
        setModalWarterCamera(false);
      });
  };

  const openGalleryWater = () => {
    setModalWarterCamera(false);
    ImagePicker.openPicker({multiple: false})
      .then(image => {
        let eachImage = {...image, uri: image?.path};
        setWaterIndexImage(eachImage);
      })
      .catch(e => {
        ImagePicker.clean();
        setModalWarterCamera(false);
      });
  };
  return (
    <View style={styles.container}>
      {showImageElectric && (
        <ModalshowImage
          modalVisible={showImageElectric}
          onRequestClose={() => setShowImageElectric(false)}
          pressClose={() => setShowImageElectric(false)}
          data={dataImg}
        />
      )}
      {showImageWater && (
        <ModalshowImage
          modalVisible={showImageWater}
          onRequestClose={() => setShowImageWater(false)}
          pressClose={() => setShowImageWater(false)}
          data={dataImgWater}
        />
      )}
      {modalShowElectricImage && (
        <ModalshowImage
          modalVisible={modalShowElectricImage}
          onRequestClose={() => setModalShowElectricImage(false)}
          pressClose={() => setModalShowElectricImage(false)}
          data={electricityIndexImage}
        />
      )}
      {modalShowWaterImage && (
        <ModalshowImage
          modalVisible={modalShowWaterImage}
          onRequestClose={() => setModalShowWaterImage(false)}
          pressClose={() => setModalShowWaterImage(false)}
          data={waterIndexImage}
        />
      )}
      {modalElectricCamera && (
        <CustomModalCamera
          openCamera={() => openCamera()}
          openGallery={() => openGallery()}
          modalVisible={modalElectricCamera}
          onRequestClose={() => setModalElectricCamera(false)}
          cancel={() => setModalElectricCamera(false)}
        />
      )}
      {modalWarterCamera && (
        <CustomModalCamera
          openCamera={() => openCameraWater()}
          openGallery={() => openGalleryWater()}
          modalVisible={modalWarterCamera}
          onRequestClose={() => setModalWarterCamera(false)}
          cancel={() => setModalWarterCamera(false)}
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
        <CustomTextTitle label={'Chỉ số điện'} />
        <View style={styles.viewBetween}>
          <View>
            <CustomIndexInput
              title={'Số cũ'}
              styleInput={{color: '#FE7A37'}}
              editable={false}
              unit={'kwh'}
              value={`${formatNumber(`${30}`)}`}
            />
            <TouchableOpacity
              onPress={() => setShowImageElectric(true)}
              style={styles.buttonImage}>
              <Image
                resizeMode="contain"
                style={{width: '100%', height: '100%'}}
                source={images.im_frame1}
              />
            </TouchableOpacity>
          </View>

          <View>
            <CustomIndexInput
              title={'Số mới'}
              unit={'kwh'}
              placeholder={'Nhập số'}
              styleInput={{color: colors.mainColor, borderBottomWidth: 1}}
            />
            {electricityIndexImage ? (
              <TouchableOpacity
                onPress={() => setModalShowElectricImage(true)}
                style={styles.buttonImage}>
                <Image
                  resizeMode="contain"
                  style={{width: '100%', height: '100%'}}
                  source={{uri: electricityIndexImage?.uri}}
                />
                <CustomButton
                  styleButton={styles.buttonDeleteImage}
                  icon={icons.ic_close}
                  styleIcon={{width: 20, height: 20, tintColor: 'white'}}
                  onPress={() => setElectricityIndexImage(null)}
                />
              </TouchableOpacity>
            ) : (
              <CustomButton
                styleButton={[styles.buttonImage, styles.buttonPicture]}
                label={'Thêm ảnh'}
                styleLabel={{color: colors.mainColor}}
                icon={icons.ic_plus}
                styleIcon={styles.addImageIcon}
                onPress={() => setModalElectricCamera(true)}
              />
            )}
          </View>
        </View>
        <CustomTextTitle label={'Chỉ số nước'} />
        <View style={styles.viewBetween}>
          <View>
            <CustomIndexInput
              title={'Số cũ'}
              styleInput={{color: '#FE7A37'}}
              editable={false}
              unit={'Khối'}
              value={`${formatNumber(`${30}`)}`}
            />
            <TouchableOpacity
              onPress={() => setShowImageWater(true)}
              style={styles.buttonImage}>
              <Image
                resizeMode="contain"
                style={{width: '100%', height: '100%'}}
                source={images.im_frame2}
              />
            </TouchableOpacity>
          </View>

          <View>
            <CustomIndexInput
              title={'Số mới'}
              unit={'Khối'}
              styleInput={{color: colors.mainColor, borderBottomWidth: 1}}
              placeholder={'Nhập số'}
            />
            {waterIndexImage ? (
              <TouchableOpacity
                onPress={() => setModalShowWaterImage(true)}
                style={styles.buttonImage}>
                <Image
                  resizeMode="contain"
                  style={{width: '100%', height: '100%'}}
                  source={{uri: waterIndexImage?.uri}}
                />
                <CustomButton
                  styleButton={styles.buttonDeleteImage}
                  icon={icons.ic_close}
                  styleIcon={{width: 20, height: 20, tintColor: 'white'}}
                  onPress={() => setWaterIndexImage(null)}
                />
              </TouchableOpacity>
            ) : (
              <CustomButton
                styleButton={[styles.buttonImage, styles.buttonPicture]}
                label={'Thêm ảnh'}
                styleLabel={{color: colors.mainColor}}
                icon={icons.ic_plus}
                styleIcon={styles.addImageIcon}
                onPress={() => setModalWarterCamera(true)}
              />
            )}
          </View>
        </View>
        <CustomTextTitle label={'Mức tiêu thụ tháng này'} />
        <View style={styles.viewBetween}>
          <CustomIndexInput
            title={'Chỉ số điện'}
            styleInput={{color: '#FE7A37'}}
            editable={false}
            unit={'kwh'}
            value={`${formatNumber(`${30}`)}`}
          />
          <CustomIndexInput
            title={'Chỉ số nước'}
            styleInput={{color: '#FE7A37'}}
            editable={false}
            unit={'Khối'}
            value={`${formatNumber(`${90}`)}`}
          />
        </View>
        <View style={{height: 56}} />
      </ScrollView>
      <CustomTwoButtonBottom
        leftLabel={'Lưu lại'}
        rightLabel={'Chốt dịch vụ'}
        styleLabelLeft={styles.styleLabelLeft}
        styleButtonLeft={styles.styleButtonLeft}
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
