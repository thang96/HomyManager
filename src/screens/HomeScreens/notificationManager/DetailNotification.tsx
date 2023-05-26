import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import AppBarComponent from '../../../components/appBarComponent/AppBarComponent';
import TextTitleComponent from '../../../components/commonComponent/TextTitleComponent';
import {icons} from '../../../constants';
const DetailNotification = (props:any) => {
  const route:any = useRoute();
  const navigation:any = useNavigation();
  return (
    <View style={styles.container}>
      <AppBarComponent
        iconLeft={icons.ic_back}
        pressIconLeft={() => navigation.goBack()}
        label={'Nội dung thông báo'}
      />
      <ScrollView style={{paddingHorizontal: 10}}>
        <TextTitleComponent label={route.params?.title} />
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
