import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {colors, icons} from '../Constants';

const RenderAmenity = props => {
  const widthImage = Dimensions.get('window').width / 3 - 10;
  const {label} = props;
  return (
    <View style={[styles.container, {width: widthImage}]}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={[styles.text]}>{label}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 38,
    backgroundColor: colors.mainColor,
    elevation: 1,
    zIndex: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    margin: 2,
  },
  styleIcon: {width: 12, height: 12, tintColor: 'white', marginLeft: 3},
  text: {fontSize: 13, fontWeight: '400', color: 'white'},
});
export default RenderAmenity;
