import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import CustomAppBar from '../../../Components/CommonComponent/CustomAppBar';
import CustomTwoButtonBottom from '../../../Components/CommonComponent/CustomTwoButtonBottom';
import {icons, colors} from '../../../Constants';
import {ScrollView} from 'react-native-virtualized-view';
import CustomSuggest from '../../../Components/CommonComponent/CustomSuggest';
import CustomChecker from '../../../Components/ComponentHome/CustomChecker';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import {useDispatch, useSelector} from 'react-redux';
import {amenityState, updateAmenity} from '../../../Store/slices/commonSlice';
import {GetListAmenitysApi} from '../../../Api/Home/AmenityApis/AmenityApis';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import {statusState} from '../../../Store/slices/statusSlice';
import {token} from '../../../Store/slices/tokenSlice';

const Utilities = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const listAmenity = useSelector(amenityState);
  const tokenStore = useSelector(token);
  const loadingState = useSelector(statusState);
  const [amenitys, setAcmenitys] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (listAmenity.length > 0) {
  //     setAcmenitys(listAmenity);
  //   }
  // }, [listAmenity]);

  useEffect(() => {
    const getListAmenity = async () => {
      await GetListAmenitysApi(tokenStore)
        .then(res => {
          if (res?.status == 200) {
            let eachData = res?.data;
            let eachArray = [];
            eachData.map((data, index) => {
              let newData = {...data, isCheck: false};
              eachArray.push(newData);
            });
            setAcmenitys(eachArray);
            setLoading(false);
          }
        })
        .catch(error => console.log(error));
    };
    getListAmenity();
  }, [loadingState]);

  const renderListService = (item, index) => {
    const updateItem = () => {
      let newList = [...amenitys];
      let itemCheck = newList[index];
      let newItem = {
        ...itemCheck,
        isCheck: itemCheck?.isCheck == false ? true : false,
      };
      newList[index] = newItem;
      setAcmenitys(newList);
    };
    return (
      <CustomChecker
        label={`${item?.name}`}
        isCheck={item?.isCheck}
        onPress={() => updateItem()}
      />
    );
  };

  const updateAmenitys = () => {
    dispatch(updateAmenity(amenitys));
    navigation.goBack();
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      {loading && <CustomLoading />}
      <CustomAppBar
        iconLeft={icons.ic_back}
        label={'Tiện ích'}
        iconRight={icons.ic_bell}
        iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
      />
      <ScrollView style={[styles.eachContainer]}>
        <CustomSuggest
          label={'Chọn tiện ích miễn phí đã có hoặc thêm mới tiện ích'}
        />
        <CustomTextTitle label={'Tiện ích hiện có'} />

        {amenitys.length > 0 ? (
          <FlatList
            listKey="listPaidSevice"
            style={{justifyContent: 'space-between'}}
            horizontal={false}
            scrollEnabled={false}
            numColumns={2}
            data={amenitys}
            keyExtractor={key => `${key.id}`}
            renderItem={({item, index}) => renderListService(item, index)}
          />
        ) : null}
      </ScrollView>
      <CustomTwoButtonBottom
        leftLabel={'Lưu'}
        rightLabel={'Thêm mới'}
        onPressLeft={() => updateAmenitys()}
        onPressRight={() => {
          dispatch(updateStatus(true));
          navigation.navigate('AddUtilities');
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  eachContainer: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: colors.backgroundGrey,
  },
  textTitle: {color: '#173b5f', fontSize: 16, fontWeight: 'bold'},
  content: {color: 'rgba(127, 138, 147, 1)', fontSize: 13, fontWeight: '400'},
  viewButton: {alignSelf: 'center', alignItems: 'center', marginVertical: 50},
});
export default Utilities;
