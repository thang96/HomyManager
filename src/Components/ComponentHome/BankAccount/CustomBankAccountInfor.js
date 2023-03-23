import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {icons} from '../../../Constants';
const CustomBankAccountInfor = props => {
  const {imageUrl, userName, accountNo, viewCustom} = props;
  return (
    <View style={[styles.container, styles.shadowView, viewCustom]}>
      <Image
        source={typeof imageUrl == 'string' ? {uri: imageUrl} : null}
        style={styles.image}
        resizeMode={'contain'}
      />
      <View>
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.accountNo}>{accountNo}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 64,
    backgroundColor: 'white',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  image: {
    height: 32,
    width: 80,
    marginRight: 10,
    borderRadius: 5,
  },
  shadowView: {
    margin: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userName: {color: '#374047', fontWeight: '600', fontSize: 15},
  accountNo: {color: '#5F6E78', fontSize: 13},
});
export default CustomBankAccountInfor;
