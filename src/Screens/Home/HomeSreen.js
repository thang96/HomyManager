import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {Children, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {GetListHausesApi} from '../../Api/Home/BuildingApis/BuildingApis';
import {GetUserAPi} from '../../Api/User/UserApis';
import CustomButton from '../../Components/CustomButton';
import CustomLoading from '../../Components/CustomLoading';
import CustomSearchAppBar from '../../Components/CustomSearchAppBar';
import {colors, icons, images, svgs} from '../../Constants';
import {token} from '../../Store/slices/tokenSlice';
import {updateUserInfor, userInfor} from '../../Store/slices/userInfoSlice';

const HomeScreen = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [textSearch, setTextSearch] = useState('');
  const [listHauses, setlistHausess] = useState([]);
  const widthImage = Dimensions.get('window').width / 2 - 20;
  const dispatch = useDispatch();
  const tokenStore = useSelector(token);
  // const userStore = useSelector(userInfor);
  const [keyboard, setKeyboard] = useState(false);
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboard(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboard(false);
    });
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    if (tokenStore != null && tokenStore != undefined && tokenStore != '') {
      await GetUserAPi(tokenStore)
        .then(res => {
          if (res?.status == 200) {
            setLoading(false);
            dispatch(updateUserInfor(res?.data));
          }
        })
        .catch(error => console.log(error));

      await GetListHausesApi(tokenStore)
        .then(res => {
          if (res?.status == 200) {
            setlistHausess(res?.data);
          }
        })
        .catch(error => console.log(error));
    }
  };

  return (
    <View style={styles.container}>
      {loading && <CustomLoading modalVisible={loading} />}
      <CustomSearchAppBar
        svgLeft={svgs.LogoApp}
        label={'Trang chủ'}
        iconRight={icons.ic_bell}
        pressIconRight={() => navigation.navigate('NotificationScreen')}
        iconRightTextInput={icons.ic_option}
        iconSecondRight={null}
        pressSeccodIconRight={() => navigation.navigate('StackAccountPage')}
        keyboard={keyboard}
        textSearch={textSearch}
        value={textSearch}
        onChangeText={text => setTextSearch(text)}
        placeholder={'Tìm kiếm...'}
      />
      <ScrollView style={styles.eachContainer}>
        <View style={styles.viewRow}>
          <CustomViewButton
            styleButton={{width: 175, height: 91}}
            styleImageBG={{width: widthImage}}
            imageBG={images.im_frame1}
            icon={icons.ic_building}
            label={'Số tòa nhà'}
            labelNumber={`${listHauses.length}`}
            onPress={() => navigation.navigate('BuildingManager')}
          />

          <CustomViewButton
            styleButton={{width: widthImage}}
            styleImageBG={{width: widthImage}}
            imageBG={images.im_frame2}
            icon={icons.ic_appartment}
            label={'Tổng số phòng'}
            labelNumber={'34'}
            onPress={async () => {}}
          />
        </View>
        <View style={[styles.viewRow, {marginTop: 20}]}>
          <CustomViewButton
            styleButton={{width: widthImage}}
            styleImageBG={{width: widthImage}}
            imageBG={images.im_frame3}
            icon={icons.ic_peoples}
            label={'Tổng số người'}
            labelNumber={'41'}
            onPress={() => navigation.navigate('TenantManager')}
          />
          <CustomViewButton
            styleButton={{width: widthImage}}
            styleImageBG={{width: widthImage}}
            imageBG={images.im_frame4}
            icon={icons.ic_hause}
            label={'Phòng trống'}
            labelNumber={'3'}
          />
        </View>
        <View style={styles.viewOption}>
          <Text style={styles.title}>Quản lý cho thuê</Text>
          <View style={[styles.viewRow, {marginTop: 15}]}>
            <CustomOptionBT
              title={'Hợp đồng'}
              content={'8'}
              svgIcon={svgs.Contract}
              styleBGIcon={{backgroundColor: '#ebf9fd'}}
              onPress={() => navigation.navigate('ContractManagement')}
            />
            <CustomOptionBT
              title={'Công việc'}
              content={'12'}
              svgIcon={svgs.Gear}
              styleBGIcon={{backgroundColor: '#fff3e9'}}
            />
            <CustomOptionBT
              title={'Hóa đơn'}
              content={'20'}
              svgIcon={svgs.DocumentGreen}
              styleBGIcon={{backgroundColor: '#e6f6e2'}}
              onPress={() => navigation.navigate('BillManagement')}
            />
          </View>
          <View style={[styles.viewRow, {marginTop: 15}]}>
            <CustomOptionBT
              title={'Dịch vụ'}
              svgIcon={svgs.Utilities}
              styleBGIcon={{backgroundColor: '#edfcfb'}}
              onPress={() => navigation.navigate('ServiceManager')}
            />
            <CustomOptionBT
              title={'Tiện ích'}
              svgIcon={svgs.Bed}
              styleBGIcon={{backgroundColor: '#edfcfb'}}
              onPress={() => navigation.navigate('UtilitiesManager')}
            />
            <CustomOptionBT
              title={'Thanh toán'}
              svgIcon={svgs.Wallet}
              styleBGIcon={{backgroundColor: '#edfcfb'}}
            />
            <CustomOptionBT
              title={'Điện-nước'}
              svgIcon={svgs.Water}
              styleBGIcon={{backgroundColor: '#edfcfb'}}
            />
          </View>
          <View style={[styles.viewRow, {marginTop: 15}]}>
            <CustomOptionBT
              title={'Sổ nợ'}
              svgIcon={svgs.Document}
              styleBGIcon={{backgroundColor: '#edfcfb'}}
            />
          </View>
        </View>
        <View style={[styles.viewRow, {marginTop: 15, marginBottom: 10}]}>
          <Text style={styles.textTitle}>Công việc</Text>
          <CustomButton
            styleButton={{flexDirection: 'row', alignItems: 'center'}}
            label={'Xem tất cả '}
            styleLabel={{color: '#0191FF', fontSize: 12}}
            iconRigght={icons.ic_next}
            styleIconRight={{width: 18, height: 18, tintColor: '#0191FF'}}
            onPress={() => navigation.navigate('StackWorkpage')}
          />
        </View>

        <View style={[styles.viewRow, {marginBottom: 10}]}>
          <View
            style={{
              height: 120,
              alignItems: 'center',
              marginRight: 10,
            }}>
            <View
              style={{
                width: 0,
                backgroundColor: 'grey',
                flex: 1,
              }}
            />
            <Image
              source={icons.ic_circle}
              style={{
                width: 30,
                height: 30,
                tintColor: colors.mainColor,
                margin: 5,
              }}
            />
            <View style={{width: 2, backgroundColor: 'grey', flex: 1}} />
          </View>
          <View
            style={{
              flex: 1,
              height: 120,
              backgroundColor: '#cff0fb',
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 10}}>Hợp đồng</Text>
              <Text style={{fontSize: 10}}>14:00 01-02-2023</Text>
            </View>
            <Text>Có hợp đồng sắp đến hạn</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 10}}>Tòa nhà D2 - Tầng 1 - P101</Text>
              <Text style={{fontSize: 10}}>Số HĐ : #123465</Text>
            </View>
          </View>
        </View>

        <View style={[styles.viewRow, {marginBottom: 10}]}>
          <View style={{height: 120, alignItems: 'center', marginRight: 10}}>
            <View style={{width: 2, backgroundColor: 'grey', flex: 1}} />
            <Image
              source={icons.ic_circle}
              style={{
                width: 30,
                height: 30,
                tintColor: colors.mainColor,
                margin: 5,
              }}
            />
            <View style={{width: 2, backgroundColor: 'grey', flex: 1}} />
          </View>
          <View
            style={{
              flex: 1,
              height: 120,
              backgroundColor: '#fff3e9',
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 10}}>Hợp đồng</Text>
              <Text style={{fontSize: 10}}>14:00 01-02-2023</Text>
            </View>
            <Text>Có hợp đồng sắp đến hạn</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 10}}>Tòa nhà D2 - Tầng 1 - P101</Text>
              <Text style={{fontSize: 10}}>Số HĐ : #123465</Text>
            </View>
          </View>
        </View>

        <View style={[styles.viewRow, {marginBottom: 60}]}>
          <View style={{height: 150, alignItems: 'center', marginRight: 10}}>
            <View style={{width: 2, backgroundColor: 'grey', flex: 1}} />
            <Image
              source={icons.ic_circle}
              style={{
                width: 30,
                height: 30,
                tintColor: colors.mainColor,
                margin: 5,
              }}
            />
            <View style={{width: 0, backgroundColor: 'grey', flex: 1}} />
          </View>
          <View
            style={{
              flex: 1,
              height: 120,
              backgroundColor: '#e6f6e2',
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 10}}>Hợp đồng</Text>
              <Text style={{fontSize: 10}}>14:00 01-02-2023</Text>
            </View>
            <Text>Có hợp đồng sắp đến hạn</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 10}}>Tòa nhà D2 - Tầng 1 - P101</Text>
              <Text style={{fontSize: 10}}>Số HĐ : #123465</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  eachContainer: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: colors.backgroundGrey,
    paddingTop: 30,
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  viewOption: {
    width: '100%',
    marginTop: 30,
    borderRadius: 10,
    zIndex: 1,
    elevation: 1,
    backgroundColor: 'white',
    margin: 2,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  title: {fontSize: 17, fontWeight: 'bold', color: 'black'},
  textTitle: {fontSize: 17, fontWeight: 'bold', color: '#163a5f'},
});

const CustomViewButton = props => {
  const {
    imageBG,
    styleImageBG,
    styleButton,
    icon,
    label,
    labelNumber,
    onPress,
  } = props;

  return (
    <TouchableOpacity style={[styleBT.button, styleButton]} onPress={onPress}>
      <Image
        source={imageBG}
        style={[styleBT.image, styleImageBG]}
        resizeMode={'cover'}
      />
      <View style={styles.viewRow}>
        <View style={styleBT.viewIcon}>
          <Image source={icon} style={{width: 32, height: 32}} />
        </View>
        <Text style={styleBT.labelNumber}>{labelNumber}</Text>
      </View>
      <Text style={styleBT.label}>{label}</Text>
    </TouchableOpacity>
  );
};
const styleBT = StyleSheet.create({
  button: {
    height: 91,
    justifyContent: 'center',
    paddingHorizontal: 10,
    width: 175,
    borderRadius: 10,
  },
  image: {height: 91, position: 'absolute', borderRadius: 10},
  viewIcon: {
    width: 32,
    height: 32,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
  },
  labelNumber: {
    color: '#374047',
    fontWeight: '600',
    fontSize: 22,
  },
  label: {
    color: '#374047',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 5,
  },
});
const CustomOptionBT = props => {
  const {styleButton, styleBGIcon, title, content, onPress, svgIcon, fillSvg} =
    props;
  const ItemSvg = svgIcon;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styleOption.button, styleButton]}>
      <View style={[styleOption.backgroundIcon, styleBGIcon]}>
        {svgIcon && <ItemSvg height={24} width={24} fill={fillSvg} />}
      </View>
      {title && <Text style={styleOption.title}>{title}</Text>}
      {content && <Text style={styleOption.content}>{content}</Text>}
    </TouchableOpacity>
  );
};
const styleOption = StyleSheet.create({
  button: {
    width: 90,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  icon: {height: 24, width: 24},
  title: {fontSize: 9, color: 'grey', textAlign: 'center'},
  content: {fontSize: 14, fontWeight: 'bold', color: 'black'},
  backgroundIcon: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default HomeScreen;
