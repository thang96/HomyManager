import React, {useEffect, useState} from 'react';
import {StyleSheet, Keyboard, View, Text} from 'react-native';
import {colors, icons, images, svgs} from '../../Constants';
import LogoApp from '../../Assets/Svgs/LogoApp.svg';
import {useNavigation} from '@react-navigation/native';
import CustomSearchAppBar from '../../Components/CustomSearchAppBar';
import CustomAppBar from '../../Components/CustomAppBar';

const StatisticScreen = () => {
  let avatar =
    'https://i.natgeofe.com/k/63b1a8a7-0081-493e-8b53-81d01261ab5d/red-panda-full-body_4x3.jpg';
  return (
    <View style={styles.container}>
      <CustomAppBar
        svgLeft={svgs.LogoApp}
        label={'Thống kê'}
        iconRight={icons.ic_bell}
        iconSecondRight={avatar}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
});
export default StatisticScreen;
