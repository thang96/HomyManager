import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import CustomAppBar from '../../../Components/CommonComponent/CustomAppBar';
import CustomTwoButtonBottom from '../../../Components/CommonComponent/CustomTwoButtonBottom';
import {icons, colors} from '../../../Constants';
import CustomChecker from '../../../Components/ComponentHome/CustomChecker';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import {ScrollView} from 'react-native-virtualized-view';
import {useDispatch, useSelector} from 'react-redux';
import {
  updateServices,
  serviceState,
  updateAmenity,
} from '../../../Store/slices/commonSlice';
import {token} from '../../../Store/slices/tokenSlice';
import {GetListServicesApi} from '../../../Api/Home/ServiceApis/ServiceApis';
import {statusState, updateStatus} from '../../../Store/slices/statusSlice';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import {uuid} from '../../../utils/uuid';

const Service = props => {
  const loadingState = useSelector(statusState);
  const tokenStore = useSelector(token);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [listSevice, setListSevice] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    const getListService = async () => {
      await GetListServicesApi(tokenStore)
        .then(res => {
          if (res?.status == 200) {
            let eachData = res?.data;
            let eachService = [];
            eachData.map((data, index) => {
              let newData = {...data, isCheck: false};
              eachService.push(newData);
            });
            setListSevice(eachService);
            setLoading(false);
          }
        })
        .catch(error => console.log(error));
    };
    getListService();
  }, [loadingState]);

  const renderListService = (item, index) => {
    const updateItem = () => {
      let newList = [...listSevice];
      let itemCheck = newList[index];
      let newItem = {
        ...itemCheck,
        isCheck: itemCheck?.isCheck == false ? true : false,
      };
      newList[index] = newItem;
      setListSevice(newList);
    };
    return (
      <CustomChecker
        label={`${item?.name}`}
        value={`${item?.fee}`}
        isCheck={item?.isCheck}
        onPress={() => updateItem()}
      />
    );
  };

  const updateservices = () => {
    dispatch(updateServices(listSevice));
    navigation.goBack();
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {loading && <CustomLoading />}
      <CustomAppBar
        iconLeft={icons.ic_back}
        label={'Dịch vụ'}
        iconRight={icons.ic_bell}
        pressIconRight={() => navigation.navigate('NotificationScreen')}
        iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
      />
      <ScrollView style={[styles.eachContainer]}>
        <Text style={styles.content}>
          Chọn dịch vụ tính phí đã có hoặc thêm mới dịch vụ
        </Text>
        <CustomTextTitle label={'Dịch vụ đã thêm'} />

        {listSevice.length > 0 ? (
          <FlatList
            listKey="listPaidSevice"
            style={{justifyContent: 'space-between'}}
            horizontal={false}
            scrollEnabled={false}
            numColumns={2}
            data={listSevice}
            keyExtractor={uuid}
            renderItem={({item, index}) => renderListService(item, index)}
          />
        ) : null}
      </ScrollView>

      <CustomTwoButtonBottom
        leftLabel={'Lưu'}
        rightLabel={'Thêm mới'}
        onPressLeft={() => updateservices()}
        onPressRight={() => {
          dispatch(updateStatus(true));
          navigation.navigate('AddService');
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  eachContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: colors.backgroundGrey,
  },
  content: {color: 'rgba(127, 138, 147, 1)', fontSize: 13, fontWeight: '400'},
});
export default Service;
