import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {GetContractDetailAPi} from '../../../Api/Home/ContractApis/ContractApis';
import {colors, icons} from '../../../Constants';
import {token} from '../../../Store/slices/tokenSlice';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import CustomAppBar from '../../../Components/CommonComponent/CustomAppBar';
import {ScrollView} from 'react-native-virtualized-view';
import {dateToDMY, formatNumber} from '../../../utils/common';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import CustomButtonBottom from '../../../Components/CommonComponent/CustomButtonBottom';
import CustomPersonInfor from '../../../Components/CommonComponent/CustomPersonInfor';
import {StraightLine} from '../../../Components/CommonComponent/LineComponent';
import CustomSuggest from '../../../Components/CommonComponent/CustomSuggest';
import RenderService from '../../../Components/ComponentHome/RenderService';
import RenderAmenity from '../../../Components/ComponentHome/RenderAmenity';
import RenderImage from '../../../Components/ComponentHome/RenderImage';
const ContractDetail = props => {
  const route = useRoute();
  const contractId = route.params;
  const navigation = useNavigation();
  const tokenStore = useSelector(token);
  const [contract, setContract] = useState();
  const [loadingContract, setLoadingContract] = useState(true);
  console.log(contractId);
  useEffect(() => {
    const getData = async () => {
      await GetContractDetailAPi(tokenStore, contractId)
        .then(res => {
          if (res?.status == 200) {
            let dataResponse = res?.data;
            let eachStartDate = new Date(dataResponse?.startDate);
            let eachEndDate = new Date(dataResponse?.endDate);
            let startDate = dateToDMY(eachStartDate);
            let endDate = dateToDMY(eachEndDate);
            setContract({...dataResponse, startDate, endDate});
            setLoadingContract(false);
          }
        })
        .catch(error => {
          alert(error);
        });
    };
    getData();
  }, []);
  const renderListService = (item, index) => {
    return (
      <RenderService
        calculateUnit={item?.chargeService?.calculateUnit}
        name={`${item?.chargeService?.name}`}
        fee={`${item?.chargeService?.fee?.toLocaleString()}`}
        onPress={() => navigation.navigate('ServiceDetail', item?.id)}
      />
    );
  };

  const renderListAcmenity = (item, index) => {
    return <RenderAmenity label={item?.name} />;
  };

  return (
    <View style={styles.container}>
      <CustomAppBar
        iconLeft={icons.ic_back}
        label={'Thông tin hợp đồng'}
        pressIconLeft={() => navigation.goBack()}
      />
      {loadingContract && <CustomLoading />}
      <ScrollView style={{paddingTop: 10, paddingHorizontal: 10}}>
        <View style={[styles.viewRow, {marginTop: 10}]}>
          <Image
            source={icons.ic_homeTabBar}
            style={[styles.icon, {marginRight: 5}]}
          />
          <Text
            style={
              styles.textInfor
            }>{`${contract?.unit?.house?.name} - ${contract?.unit?.name}`}</Text>
        </View>

        <View style={[styles.viewRow]}>
          <Image
            source={icons.ic_calendar}
            style={[styles.icon, {marginRight: 5}]}
          />
          <Text
            style={
              styles.textInfor
            }>{`Từ ${contract?.startDate} Đến ${contract?.endDate}`}</Text>
        </View>

        {StraightLine()}

        <CustomViewShowBetween
          title={'Tiền phòng'}
          value={`${formatNumber(`${contract?.leasingFee}`)}`}
          unit={'VNĐ'}
        />
        <CustomViewShowBetween
          title={'Tiền cọc'}
          value={`${formatNumber(`${contract?.depositMoney}`)}`}
          unit={'VNĐ'}
        />
        <CustomViewShowBetween
          title={'Kỳ thanh toán'}
          value={`${contract?.paymentDuration}`}
          unit={'Tháng'}
        />

        {StraightLine()}

        <CustomTextTitle label={'Dịch vụ có phí'} />
        {contract?.chargeServices?.length > 0 && (
          <FlatList
            numColumns={2}
            listKey="chargeServices"
            data={contract?.chargeServices}
            keyExtractor={(key, index) => `${key?.id}${index.toString()}`}
            renderItem={({item, index}) => renderListService(item, index)}
          />
        )}

        {StraightLine()}

        <CustomTextTitle label={'Tiện ích miễn phí'} />
        {contract?.amenities.length > 0 && (
          <FlatList
            numColumns={3}
            listKey="amenities"
            data={contract?.amenities}
            keyExtractor={(key, index) => `${key?.id}${index.toString()}`}
            renderItem={({item, index}) => renderListAcmenity(item, index)}
          />
        )}

        {StraightLine()}
        <CustomTextTitle label={'Danh sách người thuê'} />
        {contract?.tenants?.length > 0 && (
          <FlatList
            data={contract?.tenants}
            keyExtractor={key => key?.id}
            renderItem={({item, index}) => {
              return (
                <CustomPersonInfor
                  avatar={item?.avatarImage?.fileUrl}
                  userName={item?.fullName}
                  phoneNumber={item?.phoneNumber}
                />
              );
            }}
          />
        )}
        <CustomTextTitle label={'Ảnh hợp đồng'} />
        {contract?.images?.length > 0 && (
          <FlatList
            listKey={'images'}
            data={contract?.images}
            keyExtractor={key => key?.id}
            renderItem={({item, index}) => <RenderImage data={item} />}
          />
        )}

        <View style={{height: 56}} />
      </ScrollView>
      <CustomButtonBottom label={'Thêm hóa đơn'} />
    </View>
  );
};

const CustomViewShowBetween = props => {
  const {styleView, title, value, unit} = props;
  return (
    <View style={[styles.viewBetween, styleView]}>
      <Text style={{color: 'rgba(127, 138, 147, 1)', fontSize: 13}}>
        {title}
      </Text>
      <View style={styles.viewRow}>
        <Text
          style={{
            color: 'rgba(55, 64, 71, 1)',
            fontWeight: '600',
            fontSize: 15,
          }}>
          {value}
        </Text>
        <Text
          style={{
            color: 'rgba(127, 138, 147, 1)',
            fontSize: 13,
          }}>{` ${unit}`}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
  viewBetween: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  viewRow: {flexDirection: 'row', alignItems: 'center'},
  icon: {width: 20, height: 20},

  textInfor: {color: '#374047', fontSize: 13},
});
export default ContractDetail;
