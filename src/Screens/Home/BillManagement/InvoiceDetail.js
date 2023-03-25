import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Alert, FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import {useDispatch, useSelector} from 'react-redux';
import {
  GetInvoiceDetailApi,
  PutInvoiceIssueApi,
} from '../../../Api/Home/InvoiceApis/InvoiceApis';
import CustomAppBar from '../../../Components/CommonComponent/CustomAppBar';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import CustomSuggest from '../../../Components/CommonComponent/CustomSuggest';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import CustomTwoButtonBottom from '../../../Components/CommonComponent/CustomTwoButtonBottom';
import CustomModalNotify from '../../../Components/CommonComponent/CustomModalNotify';
import RenderImage from '../../../Components/ComponentHome/RenderImage';
import {colors, icons} from '../../../Constants';
import {token} from '../../../Store/slices/tokenSlice';
import {updateStatus} from '../../../Store/slices/statusSlice';
const breakLine = Array(19).fill('');

const InvoiceDetail = props => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const tokenStore = useSelector(token);
  const invoiceId = route.params;
  const [loading, setLoading] = useState(true);
  const [modalCloseTheBill, setModalCloseTheBill] = useState(false);
  const [invoice, setInvoice] = useState(null);
  const [invoiceServices, setInvoiceServices] = useState([]);
  const [serviceImages, setServiceImages] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await GetInvoiceDetailApi(tokenStore, invoiceId)
        .then(res => {
          if (res?.status == 200) {
            setInvoiceServices(res?.data?.invoiceServices);
            setServiceImages(res?.data?.serviceImages);
            setInvoice(res?.data);
            setLoading(false);
          }
        })
        .catch(error => console.log(error));
    };
    getData();
  }, []);

  const renderImage = (item, index) => {
    return <RenderImage data={item} />;
  };

  const closeTheBill = async () => {
    setModalCloseTheBill(false);
    setLoading(true);
    await PutInvoiceIssueApi(tokenStore, invoiceId)
      .then(res => {
        if (res?.status == 200) {
          dispatch(updateStatus(false));
          setLoading(false);
          navigation.navigate('InvoiceManagement');
        }
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Cảnh báo', 'Có lỗi sảy ra, vui lòng liên hệ admin...');
      });
  };

  return (
    <View style={styles.container}>
      {loading && <CustomLoading />}
      {modalCloseTheBill && (
        <CustomModalNotify
          title={'Chốt hóa đơn'}
          label={'Bạn có muốn chốt hóa đơn này ?'}
          onRequestClose={() => setModalCloseTheBill(false)}
          pressConfirm={() => closeTheBill()}
        />
      )}
      <CustomAppBar
        iconLeft={icons.ic_back}
        label={'Chi tiết hóa đơn'}
        iconRight={icons.ic_bell}
        pressIconRight={() => navigation.navigate('NotificationScreen')}
        iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
      />
      <ScrollView style={{paddingHorizontal: 10, paddingTop: 10}}>
        <View style={[styles.shadowView, styles.viewInvoice]}>
          <View style={styles.viewBetween}>
            <Text style={styles.title}>{`${invoice?.name}`}</Text>
            <Text style={{color: 'red', fontSize: 13}}>
              {invoice?.status == 0
                ? 'Chưa chốt'
                : invoice?.status == 1
                ? 'Chưa thanh toán'
                : invoice?.status == 1
                ? 'Đã thanh toán'
                : ''}
            </Text>
          </View>

          <View style={styles.viewBetween}>
            <Text style={styles.title}>{``}</Text>
            <Text style={{color: '#000000', fontSize: 13}}>
              {`${invoice?.createTime}`}
            </Text>
          </View>

          <View style={styles.viewRow}>
            <Image
              source={icons.ic_home}
              style={{height: 20, width: 20, marginRight: 10}}
            />
            <Text
              style={{
                color: 'black',
              }}>{`${invoice?.contract?.unit?.house?.name} - ${invoice?.contract?.unit?.name}`}</Text>
          </View>

          <View style={styles.viewRow}>
            <Image
              source={icons.ic_location}
              style={{height: 20, width: 20, marginRight: 10}}
            />
            <Text
              style={{
                color: 'black',
              }}>{`${invoice?.contract?.unit?.house?.address}, ${invoice?.contract?.unit?.house?.ward?.name}, ${invoice?.contract?.unit?.house?.district?.name}, ${invoice?.contract?.unit?.house?.city?.name}`}</Text>
          </View>

          <View style={styles.viewLine}>
            {breakLine.map((line, index) => {
              return (
                <View key={`${index.toString()}`} style={styles.breakLine} />
              );
            })}
          </View>

          <View style={styles.viewBetween}>
            <Text style={styles.label}>Tiền phòng</Text>
            <Text style={styles.label}>
              {`${invoice?.contract?.unit?.rentMonthlyFee.toLocaleString()}`}
            </Text>
          </View>

          <View style={styles.viewLine}>
            {breakLine.map((line, index) => {
              return (
                <View key={`${index.toString()}`} style={styles.breakLine} />
              );
            })}
          </View>

          {invoiceServices.length > 0 && (
            <FlatList
              data={invoiceServices}
              keyExtractor={key => key?.id}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.viewBetween}>
                    <Text
                      style={styles.label}>{`${item?.chargeServiceName}`}</Text>
                    <Text
                      style={
                        styles.textQuality
                      }>{`SL: ${item?.usageAmount}`}</Text>
                    <Text style={styles.label}>
                      {`${(item?.fee * item?.usageAmount).toLocaleString()}`}
                    </Text>
                  </View>
                );
              }}
            />
          )}

          <View style={styles.viewLine}>
            {breakLine.map((line, index) => {
              return (
                <View key={`${index.toString()}`} style={styles.breakLine} />
              );
            })}
          </View>

          <View style={styles.viewBetween}>
            <Text style={styles.label}>Tổng</Text>
            <Text style={{color: 'red', fontSize: 15, fontWeight: '600'}}>
              {`${invoice?.totalFee?.toLocaleString()}`}
            </Text>
          </View>

          <View style={styles.viewLine}>
            {breakLine.map((line, index) => {
              return (
                <View key={`${index.toString()}`} style={styles.breakLine} />
              );
            })}
          </View>

          <CustomTextTitle label={'Ghi chú'} />
          <CustomSuggest label={`${invoice?.notice}`} />
        </View>

        <View style={styles.line} />

        <CustomTextTitle label={'Ảnh dịch vụ'} />
        {serviceImages.length > 0 && (
          <FlatList
            horizontal
            data={serviceImages}
            keyExtractor={key => key?.id}
            renderItem={({item}) => renderImage(item)}
          />
        )}
        <View style={{height: 56}} />
        <CustomTwoButtonBottom
          leftLabel={'Chỉnh sửa'}
          rightLabel={'Chốt hóa đơn'}
          styleLabelLeft={styles.styleLabelLeft}
          styleButtonLeft={styles.styleButtonLeft}
          onPressLeft={() => {}}
          onPressRight={() => setModalCloseTheBill(true)}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
  shadowView: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    margin: 1,
    elevation: 4,
  },
  viewInvoice: {
    backgroundColor: 'white',
    width: '100%',
    padding: 10,
    borderRadius: 8,
  },
  viewBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {fontSize: 16, color: '#000000', fontWeight: '600'},
  viewRow: {flexDirection: 'row'},
  breakLine: {
    height: 0.5,
    width: 16,
    backgroundColor: colors.borderInput,
    marginLeft: 10,
  },
  viewLine: {
    flexDirection: 'row',
    marginVertical: 10,
    overflow: 'hidden',
  },
  label: {color: '#374047', fontSize: 15, fontWeight: '600'},
  textQuality: {color: '#374047', fontSize: 13},
  line: {
    height: 1,
    width: '100%',
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#97A1A7',
  },
  styleLabelLeft: {color: 'orange', fontSize: 15, fontWeight: '600'},
  styleButtonLeft: {
    borderColor: 'orange',
    backgroundColor: 'white',
    marginRight: 5,
  },
});
export default InvoiceDetail;
