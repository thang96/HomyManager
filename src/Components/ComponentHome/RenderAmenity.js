import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {colors, icons} from '../../Constants';
import CustomButton from '../CommonComponent/CustomButton';

const RenderAmenity = props => {
  const widthImage = Dimensions.get('window').width / 3 - 10;
  const {label, isDelete, deleteAmenity, onPress, disabled} = props;
  return (
    <View style={[styles.container, {width: widthImage}]}>
      <View style={[{flexDirection: 'row'}, styles.viewCenter]}>
        <TouchableOpacity
          disabled={disabled}
          onPress={onPress}
          style={{flex: 1}}>
          <Text numberOfLines={2} style={[styles.text]}>
            {label}
          </Text>
        </TouchableOpacity>
        {isDelete && (
          <CustomButton
            styleIcon={styles.iconDelete}
            icon={icons.ic_close}
            onPress={deleteAmenity}
          />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    backgroundColor: 'white',
    elevation: 1,
    zIndex: 1,
    borderRadius: 5,
    paddingLeft: 5,
    margin: 2,
  },
  styleIcon: {width: 12, height: 12, tintColor: 'white', marginLeft: 3},
  text: {fontSize: 12, fontWeight: '400', color: colors.mainColor},
  iconDelete: {
    width: 15,
    height: 15,
    tintColor: '#FF1E1E',
    marginHorizontal: 5,
  },
  viewCenter: {justifyContent: 'center', alignItems: 'center', flex: 1},
});
export default RenderAmenity;
