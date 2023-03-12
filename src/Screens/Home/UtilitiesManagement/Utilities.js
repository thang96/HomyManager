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
import CustomAppBar from '../../../Components/CustomAppBar';
import CustomTwoButtonBottom from '../../../Components/CustomTwoButtonBottom';
import {icons, colors} from '../../../Constants';
import {ScrollView} from 'react-native-virtualized-view';
import CustomSuggest from '../../../Components/CustomSuggest';
import CustomChecker from '../../../Components/CustomChecker';
import CustomTextTitle from '../../../Components/CustomTextTitle';
import {useDispatch, useSelector} from 'react-redux';
import {amenityState, updateAmenity} from '../../../Store/slices/commonSlice';

const Utilities = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const listAmenity = useSelector(amenityState);
  const [amenitys, setAcmenitys] = useState([]);

  useEffect(() => {
    if (listAmenity.length > 0) {
      setAcmenitys(listAmenity);
    }
  }, [listAmenity]);

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
        label={item?.name}
        isCheck={item?.isCheck}
        onPress={() => updateItem()}
      />
    );
  };

  const updateAmenitys = () => {
    dispatch(updateAmenity(amenitys));
    navigation.navigate('AddBuildingsStep3');
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      <KeyboardAvoidingView style={{flex: 1}}>
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
          onPressRight={() => navigation.navigate('AddUtilities')}
        />
      </KeyboardAvoidingView>
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
