import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  FlatList,
  Keyboard,
  Text,
  ScrollView,
} from 'react-native';
import {icons, colors} from '../../../Constants';
// import {ScrollView} from 'react-native-virtualized-view';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';

const CustomLiquidated = props => {
  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      <CustomTextTitle label={'Hợp đồng đã thanh lý'} />
    </View>
  );
};
const styles = StyleSheet.create({});
export default CustomLiquidated;
