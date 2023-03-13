import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {colors, icons} from '../../Constants';
import CustomButton from './CustomButton';

const CustomPersonInfor = props => {
  const {styleView, avatar, userName, phoneNumber, isCheck, onPressCheck} =
    props;
  return (
    <View style={[styles.container, styleView]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {isCheck != null && isCheck != undefined && (
          <CustomButton
            icon={isCheck ? icons.ic_check : icons.ic_unCheck}
            styleIcon={styles.iconCheck}
            onPress={onPressCheck}
          />
        )}
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
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <CustomButton
          icon={icons.ic_phone}
          styleIcon={styles.styleButtonRight}
          styleButton={styles.styleButton}
          onPress={() => {}}
        />
        <CustomButton
          icon={icons.ic_chatAppBar}
          styleIcon={styles.styleButtonRight}
          styleButton={styles.styleButton}
          onPress={() => {}}
        />
      </View>
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
    justifyContent: 'space-between',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#ebedee',
  },
  styleButton: {
    alignSelf: 'center',
    width: 50,
    height: 50,
  },
  userName: {fontSize: 15, fontWeight: 'bold', color: 'rgba(55, 64, 71, 1)'},
  phoneNumber: {fontSize: 13, color: 'rgba(85, 204, 239, 1)'},
  iconCheck: {
    width: 25,
    height: 25,
    marginRight: 8,
    tintColor: '#797979',
  },
  styleButtonRight: {width: 30, height: 30, tintColor: colors.mainColor},
});
export default CustomPersonInfor;
