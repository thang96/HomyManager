import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {colors, icons} from '../Constants';
import CustomButton from './CustomButton';

const CustomManagerInfor = props => {
  const {styleView, avatar, userName, phoneNumber, onPress} = props;
  return (
    <View style={[styles.container, styleView]}>
      <Image
        resizeMode="contain"
        style={styles.avatar}
        source={avatar ? {uri: avatar} : icons.ic_user}
      />
      <View
        style={{
          marginLeft: 10,
          justifyContent: 'center',
        }}>
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.phoneNumber}>{phoneNumber}</Text>
      </View>
      <CustomButton
        icon={icons.ic_moreOption}
        styleIcon={{width: 30, height: 30}}
        styleButton={styles.styleButton}
        onPress={onPress}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 62,
    elevation: 1,
    zIndex: 1,
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 1,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#ebedee',
  },
  styleButton: {
    position: 'absolute',
    right: 0,
    alignSelf: 'center',
    width: 50,
    height: 50,
  },
  userName: {fontSize: 15, fontWeight: 'bold', color: 'rgba(55, 64, 71, 1)'},
  phoneNumber: {fontSize: 13, color: 'rgba(85, 204, 239, 1)'},
});
export default CustomManagerInfor;
