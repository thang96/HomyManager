import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import CustomAppBar from '../../Components/CommonComponent/CustomAppBar';
import CustomTextTitle from '../../Components/CommonComponent/CustomTextTitle';
import {icons} from '../../Constants';
const DetailNotification = props => {
  const route = useRoute();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <CustomAppBar
        iconLeft={icons.ic_back}
        pressIconLeft={() => navigation.goBack()}
        label={'Nội dung thông báo'}
      />
      <ScrollView style={{paddingHorizontal: 10}}>
        <CustomTextTitle label={route.params?.title} />
        <Text
          style={
            styles.time
          }>{`${route.params?.time}  ${route.params?.day}`}</Text>
        <Text style={styles.time}>{`${route.params?.content}`}</Text>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  time: {color: 'rgba(55, 64, 71, 1)', fontSize: 13, marginBottom: 20},
});
export default DetailNotification;
