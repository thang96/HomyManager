import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import CustomButton from '../../CommonComponent/CustomButton';
import {colors, icons} from '../../../Constants';

const RenderWaterElectricity = props => {
  const {data, onPress} = props;
  return (
    <View style={{marginBottom: 15}}>
      {/* <Text style={styles.title}>{`Tầng: ${floor}`}</Text> */}
      <View key={`${data?.room}`} style={styles.viewRender}>
        <View style={styles.viewBetween}>
          <View style={{flexDirection: 'row', aligndatas: 'center'}}>
            <Image
              source={icons.ic_home}
              style={{width: 20, height: 20, tintColor: colors.mainColor}}
            />
            <Text
              style={styles.labelRoom}>{`${data?.contract?.unit?.name}`}</Text>
          </View>
          <CustomButton
            disabled={true}
            styleButton={styles.statusView}
            label={data?.statusName}
            styleLabel={{fontSize: 12, color: 'white'}}
          />
        </View>

        <Text numberOfLines={1} style={styles.content}>{`${data?.value}`}</Text>
        <View style={styles.viewBetween}>
          <View style={{flexDirection: 'row', aligndatas: 'center'}}>
            <Text style={[styles.label]}>{`Người gửi: `}</Text>
            <Text
              numberOfLines={1}
              style={[
                {fontWeight: '600'},
                styles.label,
              ]}>{`${data?.contract?.contractOwner?.fullName}`}</Text>
          </View>
          <CustomButton
            styleButton={styles.buttonConfirm}
            label={'Xác nhận'}
            styleLabel={{fontSize: 13, color: 'white'}}
            onPress={onPress}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  viewRender: {
    backgroundColor: 'white',
    minHeight: 90,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    margin: 1,
    elevation: 5,
    marginBottom: 10,
    padding: 10,
  },
  title: {fontSize: 16, fontWeight: '600', color: '#163A5F'},
  label: {fontSize: 12, color: colors.mainColor},
  content: {fontSize: 13, color: '#374047'},
  statusView: {
    paddingHorizontal: 5,
    backgroundColor: colors.backgroundOrange,
    borderRadius: 4,
  },
  viewBetween: {
    flexDirection: 'row',
    aligndatas: 'center',
    justifyContent: 'space-between',
  },
  labelRoom: {
    fontSize: 12,
    color: '#97A1A7',
    marginLeft: 5,
  },
  buttonConfirm: {
    height: 40,
    width: 120,
    backgroundColor: colors.mainColor,
    borderRadius: 5,
  },
});
export default RenderWaterElectricity;
