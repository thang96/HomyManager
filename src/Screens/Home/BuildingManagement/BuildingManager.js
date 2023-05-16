import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {GetListHausesApi} from '../../../Api/Home/BuildingApis/BuildingApis';
import CustomButton from '../../../Components/CommonComponent/CustomButton';
import CustomButtonBottom from '../../../Components/CommonComponent/CustomButtonBottom';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import CustomSearchAppBar from '../../../Components/CommonComponent/CustomSearchAppBar';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import {colors, icons, images} from '../../../Constants';
import {token} from '../../../Store/slices/tokenSlice';
import {statusState, updateStatus} from '../../../Store/slices/statusSlice';
import useKeyboard from '../../../Hook/useKeyboard';

const BuildingManager = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loadingHause = useSelector(statusState);
  const keyboard = useKeyboard();
  const [loading, setLoading] = useState(true);
  const [textSearch, setTextSearch] = useState('');
  const [listHauses, setListHauses] = useState([]);
  const tokenStore = useSelector(token);

  useEffect(() => {
    const getData = async () => {
      await GetListHausesApi(tokenStore)
        .then(res => {
          if (res?.status == 200) {
            setListHauses(res?.data);
            setLoading(false);
          }
        })
        .catch(error => console.log(error));
    };
    getData();
  }, [loadingHause]);

  const renderlistHauses = (item, index) => {
    return (
      <CustomRenderBuilding
        imageBuilding={item?.image?.fileUrl}
        name={`${item?.name}`}
        fullAddress={`${item?.fullAddress}`}
        numberRooms={`${item?.rooms ?? 0}`}
        unitTotal={`${item?.unitTotal}`}
        issueTotal={`${item?.issueTotal}`}
        emptyUnitTotal={`${item?.emptyUnitTotal ?? 0}`}
        onPress={() => {
          let hauseId = item?.id;
          navigation.navigate('BuildingInformation', hauseId);
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      {loading && <CustomLoading />}
      <CustomSearchAppBar
        iconLeft={icons.ic_back}
        label={'Quản lý tòa nhà'}
        // iconRight={icons.ic_bell}
        // pressIconRight={() => navigation.navigate('NotificationScreen')}
        iconSecondRight={icons.ic_circle}
        keyboard={keyboard}
        textSearch={textSearch}
        value={textSearch}
        onChangeText={text => setTextSearch(text)}
        placeholder={'Tìm kiếm...'}
        pressIconLeft={() => navigation.goBack()}
      />

      <View style={{flex: 1}}>
        {loading && <CustomLoading />}
        <View style={{paddingHorizontal: 10, flex: 1}}>
          <CustomTextTitle label={'Tòa nhà hiện có'} />
          <FlatList
            data={listHauses}
            keyExtractor={(item, index) => `${item?.id}`}
            renderItem={({item, index}) => renderlistHauses(item, index)}
          />
        </View>
        <CustomButtonBottom
          label={'Thêm tòa nhà mới'}
          onPress={() => {
            dispatch(updateStatus(true));
            navigation.navigate('AddBuildings');
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundGrey,
  },
});

const CustomRenderBuilding = props => {
  const {
    name,
    fullAddress,
    onPress,
    issueTotal,
    imageBuilding,
    unitTotal,
    emptyUnitTotal,
  } = props;
  return (
    <TouchableOpacity onPress={onPress} style={styleRender.button}>
      <Image
        source={
          typeof imageBuilding == 'string'
            ? {uri: `${imageBuilding}`}
            : icons.ic_building
        }
        style={styleRender.image}
      />
      <View style={styleRender.viewBetween}>
        <View style={styleRender.viewRow}>
          <Text style={styleRender.name}>{name}</Text>
        </View>
        <View style={{flex: 1}}>
          <Text numberOfLines={2} style={styleRender.address}>
            {fullAddress}
          </Text>
        </View>
        <View style={[styleRender.viewRow]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styleRender.viewImage}>
              <Image
                source={icons.ic_home}
                style={{width: 20, height: 20, tintColor: colors.mainColor}}
              />
            </View>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '600',
                  color: '#5F6E78',
                }}>
                {unitTotal}
              </Text>
              <Text style={{fontSize: 10, color: '#7F8A93'}}>Phòng</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styleRender.viewImage}>
              <Image
                source={icons.ic_key}
                style={{width: 18, height: 18, tintColor: '#7ACE68'}}
              />
            </View>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '600',
                  color: '#5F6E78',
                }}>
                {emptyUnitTotal}
              </Text>
              <Text style={{fontSize: 10, color: '#7F8A93'}}>Trống</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styleRender.viewImage}>
              <Image
                source={icons.ic_exclamation}
                style={{width: 18, height: 18, tintColor: '#FE7A37'}}
              />
            </View>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '600',
                  color: '#5F6E78',
                }}>
                {issueTotal}
              </Text>
              <Text style={{fontSize: 10, color: '#7F8A93'}}>Sự cố</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styleRender = StyleSheet.create({
  button: {
    flexDirection: 'row',
    height: 120,
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 2,
    padding: 5,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 4,
    marginBottom: 20,
  },
  viewImage: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: 'rgba(116,116,116,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewBetween: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  image: {
    width: 76,
    height: 92,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'grey',
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {width: 18, height: 18, tintColor: 'black', marginRight: 5},
  name: {fontSize: 14, fontWeight: 'bold', color: 'black'},
  styleButton: {flexDirection: 'row', alignItems: 'center'},
  address: {fontSize: 9, color: 'grey'},
});
export default BuildingManager;
