import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
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
import CustomTwoButtonBottom from '../../../Components/CommonComponent/CustomTwoButtonBottom';
import {ScrollView} from 'react-native-virtualized-view';
import {colors, icons, images} from '../../../Constants';
import CustomViewInfor from '../../../Components/CustomViewInfor';
import CustomManagerInfor from '../../../Components/CommonComponent/CustomPersonInfor';
import {FlatList} from 'react-native-gesture-handler';
import CustomAppBarBuildingInfor from '../../../Components/CustomAppBarBuildingInfor';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import {HauseDetailApi} from '../../../Api/Home/BuildingApis/BuildingApis';
import RenderService from '../../../Components/ComponentHome/RenderService';
import RenderAmenity from '../../../Components/ComponentHome/RenderAmenity';

const BuildingInformation = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const [hauseInfor, setHauseInfor] = useState();
  const [openTimeValue, setOpenTimeValue] = useState('');
  const [closeTimeValue, setCloseTimeValue] = useState('');

  useEffect(() => {
    getDataHause();
  }, [isFocused]);

  const getDataHause = async () => {
    let hauseId = route.params;
    await AsyncStorage.getItem('token').then(async token => {
      if (token != null && token != undefined && token != '') {
        await HauseDetailApi(token, hauseId)
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
      }
    });
  };

  const renderSevices = (item, index) => {
    return (
      <RenderService label={item?.name} value={item?.fee} icon={item?.icon} />
    );
  };

  const renderAmenitys = (item, index) => {
    return <RenderAmenity label={item?.name} />;
  };

  return (
    <View style={styles.container}>
      {loading && (
        <CustomLoading
          modalVisible={loading}
          pressBack={() => navigation.goBack()}
        />
      )}
      <CustomAppBarBuildingInfor
        nameBuilding={`${hauseInfor?.name}`}
        addressBuilding={`${hauseInfor?.city?.name}, ${hauseInfor?.district?.name}, ${hauseInfor?.ward?.name}, ${hauseInfor?.address}`}
        onPressLeft={() => navigation.goBack()}
      />
      <ScrollView style={{paddingHorizontal: 10, paddingTop: 20}}>
        <View style={styles.viewUtils}>
          <CustomOptionBT
            title={'Ph??ng'}
            content={hauseInfor?.units ? `${hauseInfor?.units}` : '0'}
            icon={icons.ic_bed}
            styleImageBG={{tintColor: '#1297c0'}}
            styleBGIcon={{backgroundColor: '#ebf9fd'}}
            onPress={() => navigation.navigate('FloorInformation')}
          />
          <CustomOptionBT
            title={'Tr???ng'}
            content={'8'}
            icon={icons.ic_key}
            styleImageBG={{tintColor: '#ff8d37'}}
            styleBGIcon={{backgroundColor: '#fff3e9'}}
          />
          <CustomOptionBT
            title={'Ng?????i'}
            content={'6'}
            icon={icons.ic_men}
            styleImageBG={{tintColor: '#7ace68'}}
            styleBGIcon={{backgroundColor: '#e6f6e2'}}
          />
          <CustomOptionBT
            title={'S??? c???'}
            content={'2'}
            icon={icons.ic_hammer}
            styleImageBG={{tintColor: '#f5dc00'}}
            styleBGIcon={{backgroundColor: '#fefdd9'}}
          />
        </View>

        <View style={styles.line} />

        <CustomTextTitle
          label={'Th??ng tin t??a nh??'}
          labelButton={'Ch???nh s???a'}
        />
        <View style={[styles.viewRow, {marginBottom: 10}]}>
          <CustomViewInfor
            title={'Gi??? m??? c???a'}
            label={openTimeValue}
            content={'AM'}
          />
          <CustomViewInfor
            title={'Gi??? ????ng c???a'}
            label={closeTimeValue}
            content={'PM'}
          />
        </View>
        <CustomViewInfor
          title={'Chi ph?? thu??'}
          label={`${hauseInfor?.leasingFee}`}
          content={'VN??'}
        />

        <View style={styles.line} />

        <CustomTextTitle
          label={'Qu???n l?? t??a nh??'}
          labelButton={'Th??m'}
          icon={icons.ic_plus}
        />

        <CustomManagerInfor
          styleView={{marginTop: 10}}
          userName={'Tr?????ng V??n'}
          phoneNumber={`0123456789`}
          onPress={() => {}}
        />
        <View style={styles.line} />

        <CustomTextTitle label={'Th??ng tin thanh to??n'} />

        <View style={[styles.viewRow, {marginBottom: 10}]}>
          <CustomViewInfor
            title={'Th???i gian ????ng ti???n'}
            label={`Ng??y ${hauseInfor?.paymentDateFrom}`}
          />
          <CustomViewInfor
            title={'H???n'}
            label={`Ng??y ${hauseInfor?.paymentDateTo}`}
          />
        </View>
        <CustomViewInfor
          title={'Ng??y ch???t ti???n'}
          label={
            hauseInfor?.billingDate == 0 ? 'Cu???i th??ng' : 'Ng??y 1 th??ng sau'
          }
        />

        <View style={styles.line} />

        <CustomTextTitle
          label={'D???ch v??? c?? ph??'}
          labelButton={'Th??m'}
          icon={icons.ic_plus}
        />
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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textPicker}>???? ch???n </Text>
          <Text
            style={
              styles.pickerTotal
            }>{`${hauseInfor?.chargeServices?.length}`}</Text>
        </View>

        <View style={styles.line} />

        <CustomTextTitle label={'Ti???n ??ch mi???n ph??'} />
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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textPicker}>???? ch???n </Text>
          <Text
            style={
              styles.pickerTotal
            }>{`${hauseInfor?.amenities.length}`}</Text>
        </View>

        <View style={{marginBottom: 56}} />
      </ScrollView>
      <CustomTwoButtonBottom
        leftLabel={'H???y'}
        styleButtonLeft={{
          borderColor: colors.backgroundOrange,
          backgroundColor: 'white',
          marginRight: 5,
        }}
        styleLabelLeft={{
          color: colors.backgroundOrange,
          fontSize: 15,
          fontWeight: '600',
        }}
        rightLabel={'L??u'}
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
