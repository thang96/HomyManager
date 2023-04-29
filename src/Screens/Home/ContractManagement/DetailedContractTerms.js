import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomAppBar from '../../../Components/CommonComponent/CustomAppBar';
import {icons} from '../../../Constants';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
const DetailedContractTerms = props => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <CustomAppBar
        iconLeft={icons.ic_back}
        label={'Chi tiết điều khoản'}
        pressIconLeft={() => navigation.goBack()}
      />
      <ScrollView style={{paddingHorizontal: 10, marginTop: 10}}>
        <Text>Danh sách điều khoản</Text>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({container: {flex: 1}});
export default DetailedContractTerms;
