import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {icons, colors} from '../../../Constants';
import CustomButton from '../../../Components/CommonComponent/CustomButton';
import CustomButtonBottom from '../../../Components/CommonComponent/CustomButtonBottom';
import CustomSearchAppBar from '../../../Components/CommonComponent/CustomSearchAppBar';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import {GetListInvoicesApi} from '../../../Api/Home/InvoiceApis/InvoiceApis';
import {statusState, updateStatus} from '../../../Store/slices/statusSlice';
import {token} from '../../../Store/slices/tokenSlice';
import {useDispatch, useSelector} from 'react-redux';
import InvoiceUnconfimred from '../../../Components/ComponentHome/Invoice/InvoiceUnconfimred';
import CustomButtonCarendar from '../../../Components/ComponentHome/CustomButtonCarendar';
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
  const [listInvoiceUnconfimred, setListInvoiceUnconfimred] = useState([]);
  const [listInvoiceUnpaid, setListInvoiceUnpaid] = useState([]);
  const [listInvoicePaid, setListInvoicePaid] = useState(1);
  const [valueDate, setValueDate] = useState('03-03-2023');

  useEffect(() => {
    const getListData = async () => {
      await GetListInvoicesApi(tokenStore)
        .then(res => {
          if (res?.status == 200) {
            let eachListInvoice = res?.data;
            let unconfimred = [];
            let unpaid = [];
            let paid = [];
            for (let index = 0; index < eachListInvoice.length; index++) {
              const element = eachListInvoice[index];
              if (element?.status == 0) {
                unconfimred.push(element);
              } else if (element?.status == 1) {
                unpaid.push(element);
              } else if (element?.status == 2) {
                paid.push(element);
              }
            }
            setListInvoiceUnconfimred(unconfimred);
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
          <ScrollView horizontal>
            <CustomButton
              styleButton={[
                {
                  backgroundColor:
                    isActive == 1 ? colors.backgroundOrange : 'white',
                },
                styles.viewButton,
              ]}
              label={'Chưa chốt'}
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
              label={'Chưa thanh toán'}
              styleLabel={{color: isActive == 2 ? 'white' : '#7F8A93'}}
              onPress={() => setIsActive(2)}
            />
            <CustomButton
              styleButton={[
                {
                  backgroundColor:
                    isActive == 3 ? colors.backgroundOrange : 'white',
                },
                styles.viewButton,
              ]}
              label={'Đã thanh toán'}
              styleLabel={{color: isActive == 3 ? 'white' : '#7F8A93'}}
              onPress={() => setIsActive(3)}
            />
          </ScrollView>
        </View>

        <CustomButtonCarendar
          value={valueDate}
          label={'Chọn ngày'}
          icon={icons.ic_calendar}
          onPress={() => {}}
        />

        {isActive == 1 ? (
          <InvoiceUnconfimred
            data={listInvoiceUnconfimred}
            onPress={id => {
              dispatch(updateStatus(true));
              navigation.navigate('InvoiceDetail', id);
            }}
          />
        ) : isActive == 2 ? (
          <InvoiceUnpaid
            data={listInvoiceUnpaid}
            onPress={id => {
              dispatch(updateStatus(true));
              navigation.navigate('InvoiceUnpaidDetail', id);
            }}
          />
        ) : isActive == 3 ? (
          <InvoicePaid
            data={listInvoicePaid}
            onPress={id => {
              navigation.navigate('InvoicePaidDetail', id);
            }}
          />
        ) : // : isActive == 4 ? (
        //   <InvoiceOutOfDate />
        // )
        null}
      </View>
      <CustomButtonBottom
        label={'Thêm hóa đơn'}
        onPress={() => {
          dispatch(updateStatus(true));
          navigation.navigate('CreateInvoice');
        }}
      />
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
  },
});
export default InvoiceManagement;
