import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {icons} from '../../../Constants';
import CustomButton from '../../CommonComponent/CustomButton';
const CustomBankAccountInfor = props => {
  const {
    imageUrl,
    userName,
    accountNo,
    viewCustom,
    isSelect,
    isCheck,
    onPress,
    pressDetail,
    disabledDetail,
  } = props;
  return (
    <View style={[styles.container, styles.shadowView, viewCustom]}>
      <TouchableOpacity
        disabled={disabledDetail}
        onPress={pressDetail}
        style={[styles.viewRow, {flex: 1}]}>
        <Image
          source={typeof imageUrl == 'string' ? {uri: imageUrl} : null}
          style={styles.image}
          resizeMode={'contain'}
        />
        <View style={{flex: 1}}>
          <Text numberOfLines={1} style={styles.userName}>
            {userName}
          </Text>
          <Text numberOfLines={1} style={styles.accountNo}>
            {accountNo}
          </Text>
        </View>
      </TouchableOpacity>
      <View>
        {isSelect && (
          <View style={styles.styleButton}>
            {isCheck ? (
              <CustomButton
                icon={icons.ic_check}
                styleIcon={styles.styleIcon}
                onPress={onPress}
                styleButton={styles.styleButton}
              />
            ) : (
              <CustomButton
                icon={icons.ic_unCheck}
                styleIcon={styles.styleIcon}
                onPress={onPress}
                styleButton={styles.styleButton}
              />
            )}
          </View>
        )}
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
  styleIcon: {width: 20, height: 20, tintColor: '#797979'},
  viewRow: {flexDirection: 'row', alignItems: 'center'},
});
export default CustomBankAccountInfor;
