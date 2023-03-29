import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {icons} from '../../Constants';
import CustomButton from '../CommonComponent/CustomButton';

const RenderService = props => {
  const {
    viewStyle,
    icon,
    calculateUnit,
    name,
    fee,
    onPress,
    isDelete,
    deleteService,
    disabled,
  } = props;
  const widthWindow = Dimensions.get('window').width / 2 - 15;
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.viewContainer, viewStyle, {width: widthWindow}]}>
      {/* {icon && <Image source={icon} style={styles.icon} />} */}
      <View style={{flex: 1}}>
        {name && (
          <Text
            numberOfLines={1}
            style={{fontSize: 13, fontWeight: '600', color: '#374047'}}>
            {`${name}`}
          </Text>
        )}
        {fee && (
          <Text
            numberOfLines={1}
            style={{
              fontSize: 13,
              color: '#0191FF',
            }}>{`${fee}/${calculateUnit}`}</Text>
        )}
      </View>
      {isDelete && (
        <CustomButton
          styleIcon={styles.iconService}
          icon={icons.ic_close}
          onPress={deleteService}
        />
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  viewContainer: {
    height: 52,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 2.5,
    backgroundColor: 'white',
    borderRadius: 4,
    paddingLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // icon: {width: 30, height: 30, marginHorizontal: 5},
  iconService: {
    width: 15,
    height: 15,
    tintColor: '#FF1E1E',
    marginHorizontal: 5,
  },
});
export default RenderService;
