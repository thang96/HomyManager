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

const Service = props => {
  const listServices = useSelector(serviceState);
  const tokenStore = useSelector(token);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [services, setServices] = useState([]);

  useEffect(() => {
    setServices(listServices);
  }, [listServices]);

  const renderListService = (item, index) => {
    const updateItem = () => {
      let newList = [...services];
      let itemCheck = newList[index];
      let newItem = {
        ...itemCheck,
        isCheck: itemCheck?.isCheck == false ? true : false,
      };
      newList[index] = newItem;
      setServices(newList);
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
    dispatch(updateServices(services));
    navigation.goBack();
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <CustomAppBar
          iconLeft={icons.ic_back}
          label={'Dịch vụ'}
          iconRight={icons.ic_bell}
          iconSecondRight={icons.ic_moreOption}
          pressIconLeft={() => navigation.goBack()}
        />
        <ScrollView style={[styles.eachContainer]}>
          <Text style={styles.content}>
            Chọn dịch vụ tính phí đã có hoặc thêm mới dịch vụ
          </Text>
          <CustomTextTitle label={'Dịch vụ đã thêm'} />

          {services.length > 0 ? (
            <FlatList
              listKey="listPaidSevice"
              style={{justifyContent: 'space-between'}}
              horizontal={false}
              scrollEnabled={false}
              numColumns={2}
              data={services}
              keyExtractor={(key, index) => `${key.id}${index}`}
              renderItem={({item, index}) => renderListService(item, index)}
            />
          ) : null}
        </ScrollView>

        <CustomTwoButtonBottom
          leftLabel={'Lưu'}
          rightLabel={'Thêm mới'}
          onPressLeft={() => updateservices()}
          onPressRight={() => navigation.navigate('AddService')}
        />
      </KeyboardAvoidingView>
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
