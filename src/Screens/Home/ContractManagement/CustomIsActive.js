import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  FlatList,
  Keyboard,
  Text,
  ScrollView,
} from 'react-native';
import {icons, colors} from '../../../Constants';
// import {ScrollView} from 'react-native-virtualized-view';
import CustomButton from '../../../Components/CommonComponent/CustomButton';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import {useSelector} from 'react-redux';
import {token} from '../../../Store/slices/tokenSlice';
import {GetListContractsApi} from '../../../Api/Home/ContractApis/ContractApis';
import {dateToDMY} from '../../../utils/common';
import {statusState, updateStatus} from '../../../Store/slices/statusSlice';
import RenderContract from '../../../Components/ComponentHome/RenderContract';

const CustomIsActive = props => {
  const navigation = useNavigation();
  const tokenStore = useSelector(token);
  const statusLoading = useSelector(statusState);
  const [listContract, setListContract] = useState([]);

  useEffect(() => {
    const getListData = async () => {
      await GetListContractsApi(tokenStore)
        .then(res => {
          if (res?.status == 200) {
            setListContract(res?.data);
          }
        })
        .catch(error => console.log(error));
    };
    getListData();
  }, [statusLoading]);

  const renderContract = (item, index) => {
    let eachStartDate = new Date(item?.startDate);
    let eachEndDate = new Date(item?.endDate);
    let startDate = dateToDMY(eachStartDate);
    let endDate = dateToDMY(eachEndDate);
    return (
      <RenderContract
        description={item?.description}
        startDate={`${startDate}`}
        endDate={`${endDate}`}
        houseName={`${item?.unit?.house?.name}`}
        unitName={`${item?.unit?.name}`}
        contractOwner={`${item?.contractOwner?.fullName}`}
        onPress={() => navigation.navigate('ContractDetail', item?.id)}
      />
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      <CustomTextTitle label={'Hợp đồng đang hoạt động'} />
      <FlatList
        data={listContract}
        keyExtractor={key => key.id}
        renderItem={({item, index}) => renderContract(item, index)}
      />
    </View>
  );
};
const styles = StyleSheet.create({});
export default CustomIsActive;
