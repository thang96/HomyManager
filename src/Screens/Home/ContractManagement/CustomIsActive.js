import {useNavigation} from '@react-navigation/native';
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

const CustomIsActive = props => {
  const tokenStore = useSelector(token);
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
  }, []);
  const [listContract, setListContract] = useState([]);
  const renderContract = (item, index) => {
    return (
      <View style={styles.viewContract}>
        <View style={[styles.viewRow, {justifyContent: 'space-between'}]}>
          <Text style={{fontWeight: '600', color: '#5F6E78'}}>
            {item?.contractCode}
          </Text>
          <CustomButton
            disabled={true}
            styleButton={styles.buttonActive}
            label={'Hoạt động'}
            styleLabel={{fontSize: 12, color: 'white'}}
          />
        </View>
        <View style={[styles.viewRow]}>
          <Image source={icons.ic_calendar} style={styles.icon} />
          <Text
            style={
              styles.content
            }>{`${item?.dateOfHire} đến ${item?.expirationDate}`}</Text>
        </View>
        <View style={[styles.viewRow]}>
          <Image source={icons.ic_homeTabBar} style={styles.icon} />
          <Text style={styles.content}>{`${item?.place}`}</Text>
        </View>
        <View style={[styles.viewRow]}>
          <Text style={styles.content}>{'Người tạo: '}</Text>
          <Text style={styles.label}>{`${item?.creator}`}</Text>
        </View>
        <View
          style={[
            styles.viewRow,
            {justifyContent: 'space-between', marginTop: 3},
          ]}>
          <CustomButton
            styleButton={[
              styles.buttonRender,
              {borderColor: colors.backgroundOrange},
            ]}
            label={'Chỉnh sửa'}
            styleLabel={{fontWeight: '600', color: colors.backgroundOrange}}
          />
          <CustomButton
            styleButton={[styles.buttonRender, {borderColor: colors.mainColor}]}
            label={'Thanh lý'}
            styleLabel={{fontWeight: '600', color: colors.mainColor}}
          />
          <CustomButton
            styleButton={[styles.buttonRender, {borderColor: 'red'}]}
            label={'Xóa'}
            styleLabel={{fontWeight: '600', color: 'red'}}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      <CustomTextTitle label={'Hợp đồng đang hoạt động'} />
      <FlatList
        data={listContract}
        keyExtractor={key => key.contractCode}
        renderItem={({item, index}) => renderContract(item, index)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  viewContract: {
    height: 176,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
    margin: 1,
    borderRadius: 8,
    marginBottom: 15,
  },
  viewRow: {flexDirection: 'row', alignItems: 'center'},
  buttonActive: {
    backgroundColor: colors.backgroundButton,
    width: 100,
    height: 30,
    borderRadius: 4,
  },
  content: {fontSize: 13, color: '#374047'},
  label: {fontSize: 15, color: '#374047', fontWeight: '600'},
  icon: {height: 20, width: 20, marginRight: 5},
  buttonRender: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 5,
    height: 35,
    width: 110,
  },
});
export default CustomIsActive;
