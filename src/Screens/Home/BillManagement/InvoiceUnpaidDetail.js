import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Alert, FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import {useDispatch, useSelector} from 'react-redux';
import {
  DeleteInvoiceApi,
  GetInvoiceDetailApi,
  PutInvoiceConfirmPaymentApi,
  PutInvoiceRejectApi,
} from '../../../Api/Home/InvoiceApis/InvoiceApis';
import CustomAppBar from '../../../Components/CommonComponent/CustomAppBar';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import CustomSuggest from '../../../Components/CommonComponent/CustomSuggest';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import CustomTwoButtonBottom from '../../../Components/CommonComponent/CustomTwoButtonBottom';
import CustomModalNotify from '../../../Components/CommonComponent/CustomModalNotify';
import {colors, icons} from '../../../Constants';
import {token} from '../../../Store/slices/tokenSlice';
import {updateStatus} from '../../../Store/slices/statusSlice';
import {convertDate, formatNumber} from '../../../utils/common';
import {
  BreakLine,
  StraightLine,
} from '../../../Components/CommonComponent/LineComponent';
import CustomViewServiceFee from '../../../Components/ComponentHome/Invoice/CustomViewServiceFee';
import ComponentRenderImage from '../../../Components/CommonComponent/ComponentRenderImage';
import CustomModalCamera from '../../../Components/CommonComponent/CustomModalCamera';
import ImagePicker from 'react-native-image-crop-picker';
import {
  DeleteImageApi,
  PostImageInvoiceUploadPaymentApi,
} from '../../../Api/Home/FileDataApis/FileDataApis';

const InvoiceUnpaidDetail = props => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const tokenStore = useSelector(token);
  const invoiceId = route.params;
  const [loading, setLoading] = useState(true);
  const [invoice, setInvoice] = useState(null);
  const [invoiceServices, setInvoiceServices] = useState([]);
  const timeNow = new Date();

  const [modalRejectTheBill, setModalRejectTheBill] = useState(false);
  const [modalConfrimTheBill, setModalConfrimTheBill] = useState(false);
  const [modalDeleteInvoice, setModalDeleteInvoice] = useState(false);

  const [modalCamera, setModalCamera] = useState(false);
  const [paymentImages, setPaymentImages] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await GetInvoiceDetailApi(tokenStore, invoiceId)
        .then(res => {
          if (res?.status == 200) {
            setInvoiceServices(res?.data?.invoiceServices);
            setPaymentImages(res?.data?.paymentImages);
            setInvoice(res?.data);
            setLoading(false);
          }
        })
        .catch(error => console.log(error));
    };
    getData();
  }, []);

  const openCamera = () => {
    setModalCamera(false);
    ImagePicker.openCamera({width: 300, height: 400})
      .then(image => {
        let eachImg = {...image, uri: image?.path};
        const eachResult = [...paymentImages, eachImg];
        setPaymentImages(eachResult);
      })
      .catch(e => {
        ImagePicker.clean();
        setModalCamera(false);
      });
  };

  const openGallery = () => {
    setModalCamera(false);
    ImagePicker.openPicker({multiple: false})
      .then(async image => {
        let eachImg = {...image, uri: image?.path};
        const eachResult = [...paymentImages, eachImg];
        setPaymentImages(eachResult);
      })
      .catch(e => {
        ImagePicker.clean();
        setModalCamera(false);
      });
  };
  const renderItem = (item, index) => {
    let totalPrice =
      parseInt(item?.fee ? item?.fee : 0) *
      parseInt(item?.usageAmount ? item?.usageAmount : 0);
    return (
      <CustomViewServiceFee
        chargeServiceName={item?.chargeServiceName}
        usageAmount={item?.usageAmount}
        totalPrice={totalPrice}
      />
    );
  };
  const deleteTheBill = async () => {
    setModalDeleteInvoice(false);
    setLoading(true);
    await DeleteInvoiceApi(tokenStore, invoiceId)
      .then(res => {
        if (res?.status == 200) {
          dispatch(updateStatus('deleteInvoiceSuccess'));
          navigation.navigate('InvoiceManagement');
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const rejectTheBill = async () => {
    setModalRejectTheBill(false);
    setLoading(true);
    await PutInvoiceRejectApi(tokenStore, invoiceId)
      .then(res => {
        if (res?.status == 200) {
          dispatch(updateStatus('rejectInvoiceSuccess'));
          navigation.navigate('InvoiceManagement');
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const confirmTheBill = async () => {
    setModalConfrimTheBill(false);
    if (paymentImages.length <= 0) {
      Alert.alert(
        'Thiếu thông tin',
        'Vùi lòng thêm ảnh xác nhận hóa đơn đã thanh toán',
      );
    }
    setLoading(true);
    await PutInvoiceConfirmPaymentApi(tokenStore, invoiceId)
      .then(async res => {
        if (res?.status == 200) {
          for (let index = 0; index < paymentImages.length; index++) {
            let image = [];
            const element = paymentImages[index];
            if (element?.uri) {
              image.push(element);
              await PostImageInvoiceUploadPaymentApi(
                tokenStore,
                invoiceId,
                paymentImages,
              )
                .then(res => {
                  if (res?.status == 200) {
                    console.log(res?.status);
                  }
                })
                .catch(error => {
                  console.log(error);
                });
            }
          }
          dispatch(updateStatus('confirmInvoiceSuccess'));
          navigation.navigate('InvoiceManagement');
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      {loading && <CustomLoading />}
      {modalConfrimTheBill && (
        <CustomModalNotify
          title={'Xác nhận thanh toán'}
          label={'Bạn có muốn xác nhận là đã thanh toán ?'}
          onRequestClose={() => setModalConfrimTheBill(false)}
          pressConfirm={() => confirmTheBill()}
        />
      )}
      {modalRejectTheBill && (
        <CustomModalNotify
          title={'Từ chối thanh toán'}
          label={'Bạn có muốn từ chối phiếu thanh toán này ?'}
          onRequestClose={() => setModalRejectTheBill(false)}
          pressConfirm={() => rejectTheBill()}
        />
      )}
      {modalCamera && (
        <CustomModalCamera
          openCamera={() => openCamera()}
          openGallery={() => openGallery()}
          modalVisible={modalCamera}
          onRequestClose={() => setModalCamera(false)}
          cancel={() => setModalCamera(false)}
        />
      )}
      {modalDeleteInvoice && (
        <CustomModalNotify
          title={'Xóa hóa đơn'}
          label={'Bạn có muốn xóa hóa đơn này ?'}
          onRequestClose={() => setModalDeleteInvoice(false)}
          pressConfirm={() => deleteTheBill()}
        />
      )}
      <CustomAppBar
        iconLeft={icons.ic_back}
        label={'Hóa đơn chưa thanh toán'}
        // iconRight={icons.ic_bell}
        // pressIconRight={() => navigation.navigate('NotificationScreen')}
        iconSecondRight={icons.ic_trash}
        pressSeccodIconRight={() => setModalDeleteInvoice(true)}
        pressIconLeft={() => navigation.goBack()}
      />
      <ScrollView style={{paddingHorizontal: 10, paddingTop: 10}}>
        <View style={[styles.shadowView, styles.viewInvoice]}>
          <Text style={styles.title}>{`${invoice?.name ?? ''}`}</Text>
          <Text style={{color: 'red', fontSize: 13, alignSelf: 'center'}}>
            {'Chưa thanh toán'}
          </Text>

          <View style={styles.viewBetween}>
            <Text
              style={{
                color: '#000000',
                fontSize: 13,
              }}>{`${invoice?.code}`}</Text>
            <Text style={{color: '#000000', fontSize: 13}}>
              {`${convertDate(invoice?.createTime ?? timeNow)}`}
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
              }}>{`${invoice?.contract?.unit?.house?.name ?? ''} - ${
              invoice?.contract?.unit?.name ?? ''
            }`}</Text>
          </View>

          <View style={styles.viewRow}>
            <Image
              source={icons.ic_location}
              style={{height: 20, width: 20, marginRight: 10}}
            />
            <View style={{flex: 1}}>
              <Text
                style={{
                  color: 'black',
                }}>{`${
                invoice?.contract?.unit?.house?.fullAddress ?? ''
              }`}</Text>
            </View>
          </View>
          {BreakLine()}

          <View style={styles.viewBetween}>
            <Text style={styles.label}>Tiền phòng</Text>
            <Text style={styles.label}>
              {`${formatNumber(`${invoice?.leasingFee ?? 0}`)}`}
            </Text>
          </View>

          {BreakLine()}

          {invoiceServices.length > 0 && (
            <FlatList
              data={invoiceServices}
              keyExtractor={key => key?.id}
              renderItem={({item, index}) => renderItem(item, index)}
            />
          )}
          {BreakLine()}
          <View style={styles.viewBetween}>
            <Text style={styles.label}>Phát sinh</Text>
            <Text style={styles.label}>
              {`${formatNumber(`${invoice?.otherFee ?? 0}`)}`}
            </Text>
          </View>
          {BreakLine()}
          <View style={styles.viewBetween}>
            <Text style={styles.label}>Giảm giá</Text>
            <Text style={styles.label}>
              {`${formatNumber(`${invoice?.discountFee ?? 0}`)}`}
            </Text>
          </View>
          {BreakLine()}

          <View style={styles.viewBetween}>
            <Text style={styles.label}>Tổng</Text>
            <Text style={{color: 'red', fontSize: 15, fontWeight: '600'}}>
              {`${formatNumber(`${invoice?.totalFee ?? 0}`)}`}
            </Text>
          </View>

          {BreakLine()}

          <CustomTextTitle label={'Ghi chú'} />
          <CustomSuggest
            label={`Hạn thanh toán hóa đơn là 3 ngày kể từ ngày xuất hóa đơn, vui lòng thanh toán hoặc xin gia hạn trong thời gian này.`}
          />
        </View>

        {StraightLine()}

        <ComponentRenderImage
          title={'Ảnh thanh toán'}
          label={'Tải lên ảnh thanh toán'}
          labelUpload={'Thêm ảnh'}
          data={paymentImages}
          deleteButton={true}
          openModal={() => setModalCamera(true)}
          deleteItem={async item => {
            let result = [...paymentImages];
            let newResult = result.filter(itemResult => itemResult !== item);
            if (item?.fileUrl) {
              setLoading(true);
              await DeleteImageApi(tokenStore, item?.id)
                .then(res => {
                  if (res?.status == 200) {
                    setLoading(false);
                  }
                })
                .catch(error => {
                  console.log(error);
                });
            }
            setPaymentImages(newResult);
          }}
        />

        <View style={{height: 56}} />
      </ScrollView>

      <CustomTwoButtonBottom
        leftLabel={'Từ chối'}
        rightLabel={'Xác nhận'}
        styleLabelLeft={styles.styleLabelLeft}
        styleButtonLeft={styles.styleButtonLeft}
        onPressLeft={() => setModalRejectTheBill(true)}
        onPressRight={() => setModalConfrimTheBill(true)}
      />
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
  buttonUploadIM: {
    height: 50,
    backgroundColor: colors.mainColor,
    borderRadius: 10,
  },
  labelUploadIM: {color: 'white', fontWeight: '500', fontSize: 15},
});
export default InvoiceUnpaidDetail;
