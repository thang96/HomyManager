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
import CustomButtonBottom from '../../../Components/CommonComponent/CustomButtonBottom';
import CustomSearchAppBar from '../../../Components/CommonComponent/CustomSearchAppBar';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import BillNotCreatedYet from './InvoiceNotCreatedYet';
import BillUnpaid from './InvoiceUnpaid';
import BillIsOverdue from './InvoiceIsOverdue';
import BillPaid from './InvoicePaid';
import {GetListInvoicesApi} from '../../../Api/Home/InvoiceApis/InvoiceApis';
import {statusState, updateStatus} from '../../../Store/slices/statusSlice';
import {token} from '../../../Store/slices/tokenSlice';
import {useDispatch, useSelector} from 'react-redux';

const InvoiceManagement = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loadingInvoice = useSelector(statusState);
  const [loading, setLoading] = useState(true);
  const tokenStore = useSelector(token);
  const [keyboard, setKeyboard] = useState(false);
  const [textSearch, setTextSearch] = useState('');
  const [isActive, setIsActive] = useState(1);
  const [listInvoice, setListInvoice] = useState(1);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboard(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboard(false);
    });
  }, []);

  useEffect(() => {
    const getListData = async () => {
      await GetListInvoicesApi(tokenStore)
        .then(res => {
          if (res?.status == 200) {
            setListInvoice(res?.data);
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
      <KeyboardAvoidingView style={{flex: 1}}>
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
                label={'Chưa tạo'}
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
                label={'Quá hạn'}
                styleLabel={{color: isActive == 3 ? 'white' : '#7F8A93'}}
                onPress={() => setIsActive(3)}
              />
              <CustomButton
                styleButton={[
                  {
                    backgroundColor:
                      isActive == 4 ? colors.backgroundOrange : 'white',
                  },
                  styles.viewButton,
                ]}
                label={'Đã thanh toán'}
                styleLabel={{color: isActive == 4 ? 'white' : '#7F8A93'}}
                onPress={() => setIsActive(4)}
              />
            </ScrollView>
          </View>
          {isActive == 1 ? (
            <BillNotCreatedYet />
          ) : isActive == 2 ? (
            <BillUnpaid />
          ) : isActive == 3 ? (
            <BillIsOverdue />
          ) : isActive == 4 ? (
            <BillPaid />
          ) : null}
          <CustomButtonBottom
            label={'Thêm hóa đơn'}
            onPress={() => {
              dispatch(updateStatus(false));
              navigation.navigate('CreateInvoice');
            }}
          />
        </View>
      </KeyboardAvoidingView>
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
