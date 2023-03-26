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
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import RenderInvoice from './RenderInvoice';
import {useDispatch} from 'react-redux';
import {updateStatus} from '../../../Store/slices/statusSlice';

const InvoiceUnconfimred = props => {
  const {data} = props;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [invoiceUnconfirmred, setInvoiceUnconfirmred] = useState([]);
  useEffect(() => {
    setInvoiceUnconfirmred(data);
  }, [props]);

  const renderBillNotCreatedYet = (item, index) => {
    return (
      <RenderInvoice
        totalFee={`${item?.totalFee}`}
        status={`${item?.status}`}
        name={`${item?.name}`}
        houseName={`${item?.contract?.unit?.house?.name}`}
        unitName={`${item?.contract?.unit?.name}`}
        onPress={() => {
          dispatch(updateStatus(true));
          navigation.navigate('InvoiceDetail', item?.id);
        }}
      />
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      <CustomTextTitle label={'Hóa đơn chưa chốt'} />
      {invoiceUnconfirmred.length > 0 && (
        <FlatList
          listkey={'invoiceUnconfirmred'}
          data={invoiceUnconfirmred}
          keyExtractor={key => key?.id}
          renderItem={({item, index}) => renderBillNotCreatedYet(item, index)}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({});
export default InvoiceUnconfimred;
