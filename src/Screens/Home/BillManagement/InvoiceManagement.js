import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {icons, colors} from '../../../Constants';
import CustomButton from '../../../Components/CommonComponent/CustomButton';
import CustomSearchAppBar from '../../../Components/CommonComponent/CustomSearchAppBar';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import {GetListInvoicesApi} from '../../../Api/Home/InvoiceApis/InvoiceApis';
import {statusState, updateStatus} from '../../../Store/slices/statusSlice';
import {token} from '../../../Store/slices/tokenSlice';
import {useDispatch, useSelector} from 'react-redux';
import InvoiceUnpaid from '../../../Components/ComponentHome/Invoice/InvoiceUnpaid';
import InvoicePaid from '../../../Components/ComponentHome/Invoice/InvoicePaid';
import useKeyboard from '../../../Hook/useKeyboard';

const InvoiceManagement = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loadingInvoice = useSelector(statusState);
  const [loading, setLoading] = useState(true);
  const tokenStore = useSelector(token);
  const keyboard = useKeyboard();
  const [textSearch, setTextSearch] = useState('');
  const [isActive, setIsActive] = useState(1);
  const [listInvoiceUnpaid, setListInvoiceUnpaid] = useState([]);
  const [listInvoicePaid, setListInvoicePaid] = useState(1);

  useEffect(() => {
    const getListData = async () => {
      await GetListInvoicesApi(tokenStore)
        .then(res => {
          if (res?.status == 200) {
            let eachListInvoice = res?.data;
            let unpaid = [];
            let paid = [];
            for (let index = 0; index < eachListInvoice.length; index++) {
              const element = eachListInvoice[index];
              if (element?.status == 1) {
                unpaid.push(element);
              } else if (element?.status == 2) {
                paid.push(element);
              }
            }
            setListInvoiceUnpaid(unpaid);
            setListInvoicePaid(paid);
            setLoading(false);
          }
        })
        .catch(error => console.log(error));
    };
    getListData();
  }, [loadingInvoice]);

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      {loading && <CustomLoading />}
      <CustomSearchAppBar
        iconLeft={icons.ic_back}
        label={'Quản lý hóa đơn'}
        iconRight={icons.ic_bell}
        iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
        keyboard={keyboard}
        textSearch={textSearch}
        value={textSearch}
        onChangeText={text => setTextSearch(text)}
        placeholder={'Tìm kiếm...'}
      />
      <View style={{flex: 1, paddingHorizontal: 10}}>
        <View style={styles.viewButtonTop}>
          <CustomButton
            styleButton={[
              {
                backgroundColor:
                  isActive == 1 ? colors.backgroundOrange : 'white',
              },
              styles.viewButton,
            ]}
            label={'Chưa thanh toán'}
            styleLabel={{color: isActive == 1 ? 'white' : '#7F8A93'}}
            onPress={() => setIsActive(1)}
          />
          <CustomButton
            styleButton={[
              {
                backgroundColor:
                  isActive == 2 ? colors.backgroundOrange : 'white',
              },
              styles.viewButton,
            ]}
            label={'Đã thanh toán'}
            styleLabel={{color: isActive == 2 ? 'white' : '#7F8A93'}}
            onPress={() => setIsActive(2)}
          />
        </View>

        {isActive == 1 ? (
          <InvoiceUnpaid
            data={listInvoiceUnpaid}
            onPress={id => {
              dispatch(updateStatus(true));
              navigation.navigate('InvoiceUnpaidDetail', id);
            }}
          />
        ) : isActive == 2 ? (
          <InvoicePaid
            data={listInvoicePaid}
            onPress={id => {
              navigation.navigate('InvoicePaidDetail', id);
            }}
          />
        ) : null}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  eachContainer: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: colors.backgroundGrey,
  },
  viewButtonTop: {
    backgroundColor: 'white',
    borderRadius: 4,
    height: 48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 10,
    paddingHorizontal: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewButton: {
    height: 42,
    borderRadius: 4,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    flex: 1,
  },
});
export default InvoiceManagement;
