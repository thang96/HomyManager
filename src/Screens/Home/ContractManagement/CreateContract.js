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
import CustomInputValue from '../../../Components/CustomInputValue';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import {uuid} from '../../../utils/uuid';
import CustomInput from '../../../Components/CommonComponent/CustomInput';
import CustomTimeButtons from '../../../Components/CustomTimeButton';
import CustomModalDateTimePicker from '../../../Components/CommonComponent/CustomModalDateTimePicker';
import CustomTwoButtonBottom from '../../../Components/CommonComponent/CustomTwoButtonBottom';
import ImagePicker from 'react-native-image-crop-picker';
import CustomModalCamera from '../../../Components/CommonComponent/CustomModalCamera';
import CustomSuggest from '../../../Components/CommonComponent/CustomSuggest';
import RenderAmenity from '../../../Components/ComponentHome/RenderAmenity';
import RenderService from '../../../Components/ComponentHome/RenderService';

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
    {label: '??i???n', value: '4000/KWH'},
    {label: 'N?????c', value: '5000/M??'},
    {label: 'Wifi', value: '50000/T'},
    {label: 'Ga', value: '200000/T'},
    {label: 'Ga1', value: '200000/T'},
    {label: 'Ga2', value: '200000/T'},
    {label: 'Ga3', value: '200000/T'},
  ]);
  const [listFreeSevice, setListFreeSevice] = useState([
    {label: 'M??y l???nh', value: '1'},
    {label: 'WC ri??ng', value: '2'},
    {label: 'Ch??? ????? xe', value: '3'},
    {label: 'T??? l???nh', value: '4'},
    {label: 'M??y gi???t', value: '5'},
    {label: 'Gi??? t??? do', value: '6'},
    {label: 'Ch??n - m??n', value: '7'},
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
        label={'T???o h???p ?????ng'}
        iconRight={icons.ic_bell}
        iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
      />
      <ScrollView style={{paddingHorizontal: 10, paddingTop: 10}}>
        <CustomSuggest
          label={'Vui l??ng ??i???n ?????y ????? th??ng tin! M???c c?? d???u * l?? b???t bu???c'}
        />
        <CustomTextTitle label={'Th??ng tin h???p ?????ng'} />
        <CustomInput
          important={true}
          type={'button'}
          styleViewInput={{marginTop: 10}}
          title={'T??a nh??'}
          placeholder={'Ch???n t??a nh??'}
          onPress={() => {}}
        />
        <CustomInput
          important={true}
          type={'button'}
          styleViewInput={{marginTop: 20}}
          title={'Ph??ng'}
          placeholder={'Ch???n ph??ng'}
          onPress={() => {}}
        />
        <CustomInput
          important={true}
          type={'button'}
          styleViewInput={{marginTop: 20}}
          title={'?????i di???n ng?????i cho thu??'}
          placeholder={'Ch???n ?????i di???n ng?????i cho thu??'}
          onPress={() => {}}
        />

        <CustomTimeButtons
          styleContainer={{marginTop: 20}}
          title={'Th???i gian n???p ti???n ph??ng'}
          leftLabel={'T???'}
          rightLabel={'?????n'}
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
          title={'Ng??y b???t ?????u t??nh ti???n'}
          placeholder={'09/02/2023'}
          onPress={() => {}}
        />

        <CustomInput
          important={true}
          type={'button'}
          styleViewInput={{marginTop: 20}}
          title={'K??? thanh to??n ti???n ph??ng'}
          placeholder={`${1} th??ng`}
          onPress={() => {}}
        />

        <CustomTextTitle label={'Ti???n ph??ng'} />
        <CustomInputValue
          type={'button'}
          label={'Ti???n thu?? ph??ng'}
          important={true}
          value={'1500000'}
          unit={'VN??'}
        />
        <CustomInputValue
          viewContainer={{marginTop: 20}}
          type={'button'}
          label={'Ti???n c???c'}
          important={true}
          value={'500000'}
          unit={'VN??'}
        />

        <View style={styles.line} />

        <CustomTextTitle
          label={'?????i di???n ng?????i cho thu??'}
          labelButton={'Th??m m???i'}
        />

        <View style={styles.line} />

        <CustomTextTitle label={'D???ch v??? c?? ph??'} labelButton={'Th??m m???i'} />

        <CustomSuggest
          label={'Ch???n d???ch v??? t??nh ph?? ???? c?? ho???c th??m m???i d???ch v???'}
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
          <Text style={styles.textPicker}>???? ch???n </Text>
          <Text style={styles.pickerTotal}>{`${listPaidSevice.length}`}</Text>
        </View>

        <View style={styles.line} />

        <CustomTextTitle label={'Ti???n ??ch mi???n ph??'} labelButton={'Th??m m???i'} />

        <CustomSuggest
          label={'Ch???n ti???n ??ch mi???n ph?? ???? c?? ho???c th??m m???i ti???n ??ch'}
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
          <Text style={styles.textPicker}>???? ch???n </Text>
          <Text style={styles.pickerTotal}>{`${listFreeSevice.length}`}</Text>
        </View>

        <View style={styles.line} />

        <CustomTextTitle label={'Th??m ???nh h???p ?????ng'} />
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
              label={'T???i l??n ???nh h???p ?????ng ( t???i ??a 10 ???nh )'}
              styleLabel={[styles.title, {marginTop: 5}]}
              disabled={true}
              icon={icons.ic_upload}
              styleIcon={{with: 100, height: 100, alignSelf: 'center'}}
            />
          )}
        </View>

        <CustomButton
          styleButton={[styles.buttonUploadIM]}
          label={'T???i l??n ???nh h???p ?????ng'}
          styleLabel={styles.labelUploadIM}
          onPress={() => setModalCamera(true)}
        />

        <View style={styles.line} />

        <CustomTextTitle
          label={'Danh s??ch ng?????i thu??'}
          labelButton={'Th??m m???i'}
          onPress={() => navigation.navigate('TenantList')}
        />

        <View style={{height: 56}} />
      </ScrollView>
      <CustomTwoButtonBottom
        leftLabel={'Tr??? l???i'}
        rightLabel={'Ti???p t???c'}
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
