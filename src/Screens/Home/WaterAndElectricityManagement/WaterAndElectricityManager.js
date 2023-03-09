import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {colors, icons, images, svgs} from '../../../Constants';
import CustomAppBar from '../../../Components/CustomAppBar';
import {useNavigation} from '@react-navigation/native';

const WaterAndElectricityManagement = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <CustomAppBar
        iconLeft={icons.ic_back}
        pressIconLeft={() => navigation.goBack()}
        label={'Chốt điện nước'}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
});
export default WaterAndElectricityManagement;
