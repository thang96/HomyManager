import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {GetContractDetailAPi} from '../../../Api/Home/ContractApis/ContractApis';
import {useSelector} from 'react-redux';
import {token} from '../../../Store/slices/tokenSlice';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import {colors, icons} from '../../../Constants';
import CustomAppBar from '../../../Components/CommonComponent/CustomAppBar';
import CustomSuggest from '../../../Components/CommonComponent/CustomSuggest';
import {dateToDMY, formatNumber} from '../../../utils/common';
import ComponentInput from '../../../Components/CommonComponent/ComponentInput';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import ComponentButton from '../../../Components/CommonComponent/ComponentButton';
import CustomTimeButtons from '../../../Components/CommonComponent/CustomTimeButton';
import {StraightLine} from '../../../Components/CommonComponent/LineComponent';
import ComponentRenderImage from '../../../Components/CommonComponent/ComponentRenderImage';
import CustomTwoButtonBottom from '../../../Components/CommonComponent/CustomTwoButtonBottom';
import CustomPersonInfor from '../../../Components/CommonComponent/CustomPersonInfor';
import RenderServiceInput from '../../../Components/ComponentHome/Contract/RenderServiceInput';
import RenderAmenity from '../../../Components/ComponentHome/RenderAmenity';
const EditContract = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const contractId = route.params;
  const tokenStore = useSelector(token);
  const [contract, setContract] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      await GetContractDetailAPi(tokenStore, contractId)
        .then(res => {
          if (res?.status == 200) {
            let dataResponse = res?.data;
            let eachStartDate = new Date(dataResponse?.startDate);
            let eachEndDate = new Date(dataResponse?.endDate);
            let eachStartChargeDate = new Date(dataResponse?.startChargeDate);
            let startDate = dateToDMY(eachStartDate);
            let endDate = dateToDMY(eachEndDate);
            let startChargeDate = dateToDMY(eachStartChargeDate);
            setContract({...dataResponse, startDate, endDate, startChargeDate});
            setLoading(false);
          }
        })
        .catch(error => {
          alert(error);
        });
    };
    getData();
  }, []);

  const renderSelectTenant = (item, index) => {
    return (
      <CustomPersonInfor
        styleView={{marginBottom: 10}}
        userName={`${item?.fullName}`}
        phoneNumber={`${item?.phoneNumber}`}
        avatar={item?.avatarImage?.fileUrl}
      />
    );
  };

  const renderSelectSevice = (item, index) => {
    return (
      <RenderServiceInput
        viewComponent={{marginBottom: 10}}
        isProgressive={item?.isProgressive}
        placeholder={'Nhập chỉ số ban đầu'}
        name={item?.name}
        fee={item?.fee}
        calculateUnit={item?.calculateUnit}
        value={`${formatNumber(`${item?.initUsageAmount}` ?? '')}`}
        onChangeText={text => {
          let eachService = [...listService];
          eachService[index] = {...item, initUsageAmount: text};
          setListService(eachService);
        }}
      />
    );
  };

  const renderSelectAmenity = (item, index) => {
    return <RenderAmenity label={item?.name} />;
  };

  return (
    <View style={styles.container}>
      {loading && <CustomLoading />}
      <CustomAppBar
        iconLeft={icons.ic_back}
        label={'Chỉnh sửa hợp đồng'}
        pressIconLeft={() => navigation.goBack()}
      />
      <ScrollView
        nestedScrollEnabled={true}
        keyboardDismissMode="none"
        style={{paddingHorizontal: 10, paddingTop: 10}}>
        <CustomSuggest
          label={'Vui lòng điền đầy đủ thông tin! Mục có dấu * là bắt buộc'}
        />
        <CustomTextTitle label={'Thông tin hợp đồng'} />
        <ComponentInput
          important={true}
          viewComponent={{marginTop: 10}}
          type={'input'}
          title={'Phòng'}
          placeholder={'Chọn phòng'}
          value={contract?.unit?.name}
          editable={false}
        />

        <CustomTimeButtons
          important={true}
          styleContainer={{marginTop: 20}}
          title={'Thời hạn'}
          leftLabel={'Từ'}
          rightLabel={'Đến'}
          styleButtonLeft={{marginRight: 5}}
          styleButtonRight={{marginLeft: 5}}
          valueLeft={`${contract?.startDate}`}
          valueRight={`${contract?.endDate}`}
          //   onPressLeft={() => {
          //     setStartDate(dateToYMD(timeStart));
          //     setStartDateValue(dateToDMY(timeStart));
          //     setModalStartDate(true);
          //   }}
          //   onPressRightt={() => {
          //     setEndDate(dateToYMD(timeEnd));
          //     setEndDateValue(dateToDMY(timeEnd));
          //     setModalEndDate(true);
          //   }}
        />
        <ComponentButton
          type={'buttonSelect'}
          important={true}
          viewComponent={{marginTop: 10}}
          title={'Ngày bắt đầu tính tiền'}
          placeholder={'Chọn ngày'}
          value={`${contract?.startChargeDate}`}
          //   onPress={() => {
          //     setStartChargeDate(dateToYMD(timeChargeDate));
          //     setStartChargeDateValue(dateToDMY(timeChargeDate));
          //     setModalStartChargeDate(true);
          //   }}
        />
        <ComponentButton
          type={'buttonSelect'}
          important={true}
          viewComponent={{marginTop: 10}}
          title={'Kỳ thanh toán tiền phòng'}
          placeholder={`Chọn kỳ thanh toán`}
          value={contract?.paymentDuration}
          onPress={() => setModalPaymentDuration(true)}
        />

        <CustomTextTitle label={'Tiền phòng'} />

        <ComponentInput
          important={true}
          type={'inputUnit'}
          title={'Tiền thuê phòng'}
          placeholder={'Nhập tiền thuê phòng'}
          keyboardType={'number-pad'}
          unit={'VNĐ'}
          value={`${formatNumber(`${contract?.leasingFee}`)}`}
          onChangeText={text => setLeasingFee(text)}
        />
        <ComponentInput
          important={true}
          viewComponent={{marginTop: 10}}
          type={'inputUnit'}
          title={'Tiền cọc'}
          placeholder={'Nhập tiền cọc'}
          keyboardType={'number-pad'}
          unit={'VNĐ'}
          value={`${formatNumber(`${contract?.depositMoney}`)}`}
          onChangeText={text => setDepositMoney(text)}
        />

        {StraightLine()}
        <CustomTextTitle
          label={'Điều khoản hợp đồng'}
          labelButton={'Xem chi tiết'}
          onPress={() => navigation.navigate('DetailedContractTerms')}
        />
        {StraightLine()}

        <CustomTextTitle
          label={'Danh sách người ở'}
          labelButton={'Thêm'}
          icon={icons.ic_plus}
          onPress={() => navigation.navigate('TenantList')}
        />
        <View>
          <ScrollView horizontal={true} style={{width: '100%'}}>
            {contract?.tenants?.length > 0 ? (
              <FlatList
                listKey="listTenant"
                horizontal={false}
                scrollEnabled={false}
                numColumns={1}
                keyExtractor={key => key.id}
                data={contract?.tenants}
                renderItem={({item, index}) => renderSelectTenant(item, index)}
              />
            ) : null}
          </ScrollView>
        </View>

        {StraightLine()}

        <CustomTextTitle
          label={'Dịch vụ có phí'}
          labelButton={'Thêm'}
          icon={icons.ic_plus}
          onPress={() => navigation.navigate('Service')}
        />

        <View>
          <ScrollView horizontal={true} style={{width: '100%'}}>
            {contract?.chargeServices?.length > 0 ? (
              <FlatList
                listKey="listService"
                horizontal={false}
                scrollEnabled={false}
                numColumns={1}
                keyExtractor={key => key.id}
                data={contract?.chargeServices}
                renderItem={({item, index}) => renderSelectSevice(item, index)}
              />
            ) : null}
          </ScrollView>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textPicker}>Đã chọn </Text>
          <Text
            style={
              styles.pickerTotal
            }>{`${contract?.chargeServices?.length}`}</Text>
        </View>

        {StraightLine()}

        <CustomTextTitle
          label={'Tiện ích miễn phí'}
          labelButton={'Thêm'}
          icon={icons.ic_plus}
          onPress={() => navigation.navigate('Utilities')}
        />

        <View>
          <ScrollView horizontal={true} style={{width: '100%'}}>
            {contract?.amenities?.length > 0 ? (
              <FlatList
                listKey="listAmenity"
                horizontal={false}
                scrollEnabled={false}
                numColumns={2}
                keyExtractor={key => key.id}
                data={contract?.amenities}
                renderItem={({item, index}) => renderSelectAmenity(item, index)}
              />
            ) : null}
          </ScrollView>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textPicker}>Đã chọn </Text>
          <Text
            style={styles.pickerTotal}>{`${contract?.amenities?.length}`}</Text>
        </View>

        {StraightLine()}
        <ComponentRenderImage
          title={'Ảnh hợp đồng'}
          label={'Thêm ảnh hợp đồng'}
          labelUpload={'Thêm ảnh'}
          data={contract?.images}
          deleteButton={true}
          openModal={() => setModalCamera(true)}
          deleteItem={item => {
            let result = [...contractImages];
            let newResult = result.filter(itemResult => itemResult !== item);
            setContractImages(newResult);
          }}
        />
        <View style={{height: 56}} />
      </ScrollView>
      <CustomTwoButtonBottom
        styleButtonLeft={styles.styleButtonLeft}
        styleLabelLeft={styles.styleLabelLeft}
        leftLabel={'Hủy'}
        rightLabel={'Hoàn tất'}
        onPressLeft={() => navigation.goBack()}
        onPressRight={() => setModalCreateContract(true)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
});
export default EditContract;
