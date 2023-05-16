import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import {useDispatch, useSelector} from 'react-redux';
import CustomAppBar from '../../../Components/CommonComponent/CustomAppBar';
import {token} from '../../../Store/slices/tokenSlice';
import {statusState, updateStatus} from '../../../Store/slices/statusSlice';
import {colors, icons} from '../../../Constants';
import {GetBankAccountsApi} from '../../../Api/Home/BankAccountApis/BankAccountApis';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import CustomButtonBottom from '../../../Components/CommonComponent/CustomButtonBottom';
import CustomBankAccountInfor from '../../../Components/ComponentHome/BankAccount/CustomBankAccountInfor';
const PaymentManagement = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const tokenStore = useSelector(token);
  const loadingPayment = useSelector(statusState);
  const [loading, setLoading] = useState(true);
  const [listBankAccount, setListBankAccount] = useState([]);

  useEffect(() => {
    const getListData = async () => {
      await GetBankAccountsApi(tokenStore)
        .then(res => {
          if (res?.status == 200) {
            setListBankAccount(res?.data);
            setLoading(false);
          }
        })
        .catch(error => console.log(error));
    };
    getListData();
  }, [loadingPayment]);

  return (
    <View style={styles.container}>
      {loading && <CustomLoading />}
      <CustomAppBar
        iconLeft={icons.ic_back}
        label={'Ngân hàng hiện có'}
        // iconRight={icons.ic_bell}
        // pressIconRight={() => navigation.navigate('NotificationScreen')}
        // iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
      />
      <ScrollView style={{paddingHorizontal: 10, paddingTop: 10}}>
        {listBankAccount.length > 0 && (
          <FlatList
            data={listBankAccount}
            keyExtractor={key => key?.id}
            renderItem={({item, index}) => {
              return (
                <CustomBankAccountInfor
                  viewCustom={{marginBottom: 10}}
                  imageUrl={item?.bank?.logo}
                  userName={item?.accountName}
                  accountNo={item?.accountNo}
                  pressDetail={() =>
                    navigation.navigate('PaymentDetail', item?.id)
                  }
                />
              );
            }}
          />
        )}
      </ScrollView>
      <CustomButtonBottom
        label={'Thêm ngân hàng'}
        onPress={() => {
          dispatch(updateStatus(true));
          navigation.navigate('AddPayment');
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
});
export default PaymentManagement;
