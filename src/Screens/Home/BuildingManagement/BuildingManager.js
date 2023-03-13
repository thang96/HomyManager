import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
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
  FlatList,
} from 'react-native';
import {useSelector} from 'react-redux';
import {GetListHausesApi} from '../../../Api/Home/BuildingApis/BuildingApis';
import CustomButton from '../../../Components/CustomButton';
import CustomButtonBottom from '../../../Components/CustomButtonBottom';
import CustomLoading from '../../../Components/CustomLoading';
import CustomSearchAppBar from '../../../Components/CustomSearchAppBar';
import CustomTextTitle from '../../../Components/CustomTextTitle';
import {colors, icons, images} from '../../../Constants';
import {token} from '../../../Store/slices/tokenSlice';

const BuildingManager = () => {
  const navigation = useNavigation();
  const [keyboard, setKeyboard] = useState(false);
  const [loading, setLoading] = useState(true);
  const [textSearch, setTextSearch] = useState('');
  const [listHauses, setListHauses] = useState([]);
  const tokenStore = useSelector(token);
  const isFocused = useIsFocused();

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
  }, [isFocused]);

  const getData = async () => {
    await GetListHausesApi(tokenStore)
      .then(res => {
        if (res?.status == 200) {
          setLoading(false);
          setListHauses(res?.data);
        }
      })
      .catch(error => console.log(error));
  };

  const renderlistHauses = (item, index) => {
    return (
      <CustomRenderBuilding
        name={`${item?.name}`}
        address={`${item?.city?.name} - ${item?.district?.name} - ${item?.ward?.name} - ${item?.address}`}
        numberRooms={`${item?.rooms ?? 0}`}
        onPress={() => {
          let hauseId = item?.id;
          navigation.navigate('BuildingInformation', hauseId);
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <CustomSearchAppBar
        iconLeft={icons.ic_back}
        label={'Quản lý tòa nhà'}
        iconRight={icons.ic_bell}
        iconSecondRight={icons.ic_circleFill}
        keyboard={keyboard}
        textSearch={textSearch}
        value={textSearch}
        onChangeText={text => setTextSearch(text)}
        placeholder={'Tìm kiếm...'}
        pressIconLeft={() => navigation.goBack()}
      />

      <View style={{flex: 1}}>
        {loading && (
          <CustomLoading
            modalVisible={loading}
            pressBack={() => navigation.goBack()}
          />
        )}
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
          onPress={() => navigation.navigate('AddBuildings')}
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
  const {name, address, onPress, numberRooms} = props;
  return (
    <TouchableOpacity onPress={onPress} style={styleRender.button}>
      <Image source={icons.ic_building} style={styleRender.image} />
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          paddingHorizontal: 10,
          justifyContent: 'space-between',
        }}>
        <View style={styleRender.viewRow}>
          <Text style={styleRender.name}>{name}</Text>
          <Image source={icons.ic_plus} style={styleRender.icon} />
        </View>
        <Text style={styleRender.address}>{address}</Text>
        <View style={[styleRender.viewRow]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 30,
                backgroundColor: colors.backgroundInput,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={icons.ic_home}
                style={{width: 20, height: 20, tintColor: colors.mainColor}}
              />
            </View>
            <View style={{alignItems: 'center', height: 40}}>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '600',
                  color: '#5F6E78',
                }}>
                {numberRooms}
              </Text>
              <Text style={{fontSize: 10, color: '#7F8A93'}}>Phòng</Text>
            </View>
          </View>
          <CustomButton
            disabled={true}
            label={'4'}
            icon={icons.ic_key}
            styleIcon={styleRender.icon}
            styleButton={styleRender.styleButton}
          />
          <CustomButton
            disabled={true}
            label={'2'}
            icon={icons.ic_exclamation}
            styleIcon={styleRender.icon}
            styleButton={styleRender.styleButton}
          />
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
