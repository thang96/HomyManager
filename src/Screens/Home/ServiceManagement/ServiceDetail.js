import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {GetServiceDetailAPi} from '../../../Api/Home/ServiceApis/ServiceApis';
import CustomAppBar from '../../../Components/CustomAppBar';
import CustomLoading from '../../../Components/CustomLoading';
import {colors, icons} from '../../../Constants';
import {token} from '../../../Store/slices/tokenSlice';

const ServiceDetail = props => {
  const [loading, setLoading] = useState(true);
  const [service, setService] = useState(true);
  const tokenStore = useSelector(token);
  const navigation = useNavigation();
  const route = useRoute();
  useEffect(() => {
    getServiceDetail();
  }, []);
  const getServiceDetail = async () => {
    await GetServiceDetailAPi(tokenStore, route.params)
      .then(res => {
        if (res?.status == 200) {
          setService(res?.data);
          setLoading(false);
        }
      })
      .catch(error => console.log(error));
  };
  return (
    <View style={styles.container}>
      {loading && <CustomLoading />}
      <CustomAppBar
        iconLeft={icons.ic_back}
        label={'Chi tiết dịch vụ'}
        pressIconLeft={() => navigation.goBack()}
      />
      <ScrollView style={{paddingHorizontal: 10, paddingTop: 10}}>
        <View style={[styles.shadowView, styles.viewDetail]}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.title}>Tên dịch vụ:</Text>
            <Text style={styles.title}>{`${service?.name}`}</Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.title}>Mức phí:</Text>
            <Text style={styles.title}>{`${service?.fee} VNĐ`}</Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.title}>Đơn vị tính:</Text>
            <Text style={styles.title}>{`${service?.calculateUnit}`}</Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.title}>Mô tả:</Text>
            <Text style={styles.title}>{`${service?.description}`}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
  shadowView: {
    margin: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  viewDetail: {backgroundColor: 'white', padding: 10, borderRadius: 8},
  title: {color: 'black', fontSize: 15, fontWeight: '600'},
});
export default ServiceDetail;
