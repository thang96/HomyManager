import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CustomAppBar from '../../../Components/CommonComponent/CustomAppBar';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import CustomBankAccountInfor from '../../../Components/ComponentHome/BankAccount/CustomBankAccountInfor';
import CustomTwoButtonBottom from '../../../Components/CommonComponent/CustomTwoButtonBottom';
import {colors, icons} from '../../../Constants';
import {statusState, updateStatus} from '../../../Store/slices/statusSlice';
import {token} from '../../../Store/slices/tokenSlice';
import {
  bankAccountState,
  updateBankAccounts,
} from '../../../Store/slices/commonSlice';
import {GetBankAccountsApi} from '../../../Api/Home/BankAccountApis/BankAccountApis';
const ListPaymentSelect = props => {
  const navigation = useNavigation();
  const bankAccountsStore = useSelector(bankAccountState);
  const statusLoading = useSelector(statusState);
  const tokenStore = useSelector(token);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [eachBankAccounts, setEachBankAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bank, setBank] = useState();
  useEffect(() => {
    setBankAccounts(bankAccountsStore);
    setEachBankAccounts(bankAccountsStore);
  }, [bankAccountsStore]);
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      await GetBankAccountsApi(tokenStore)
        .then(res => {
          if (res?.status == 200) {
            let data = res?.data;
            let eachData = [];
            for (let index = 0; index < data.length; index++) {
              let element = data[index];
              let newElement = {...element, isCheck: false};
              eachData.push(newElement);
            }
            setEachBankAccounts(res?.data);
            setBankAccounts(res?.data);
            setLoading(false);
          }
        })
        .catch(error => console.log(error));
    };
    getData();
  }, [statusLoading]);

  const renderItem = (item, index) => {
    return (
      <CustomBankAccountInfor
        isSelect={true}
        viewCustom={{marginBottom: 10}}
        imageUrl={item?.bank?.logo}
        userName={item?.name}
        accountNo={item?.accountNo}
        isCheck={item?.isCheck}
        onPress={() => {
          let newBankAccount = [...eachBankAccounts];
          newBankAccount[index] = {...item, isCheck: true};
          setBankAccounts(newBankAccount);
          setBank(item);
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      {loading && <CustomLoading />}
      <CustomAppBar
        iconLeft={icons.ic_back}
        label={'Danh sách ngân hàng'}
        // iconRight={icons.ic_bell}
        // pressIconRight={() => navigation.navigate('NotificationScreen')}
        // iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
      />
      <View style={styles.eachContainer}>
        {bankAccounts?.length > 0 && (
          <FlatList
            data={bankAccounts}
            keyExtractor={key => key?.id}
            renderItem={({item, index}) => renderItem(item, index)}
          />
        )}
      </View>
      <CustomTwoButtonBottom
        leftLabel={'Lưu'}
        rightLabel={'Thêm mới'}
        onPressLeft={() => {
          dispatch(updateBankAccounts(bank));
          navigation.goBack();
        }}
        onPressRight={() => {
          dispatch(updateStatus(true));
          navigation.navigate('AddPayment');
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
  eachContainer: {paddingHorizontal: 10, paddingTop: 10, flex: 1},
});
export default ListPaymentSelect;
