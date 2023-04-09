import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import CustomButton from '../../CommonComponent/CustomButton';
import {colors, icons} from '../../../Constants';

const RenderWaterElectricity = props => {
  const {value, room, name, onPress, floor} = props;
  return (
    <View style={{marginBottom: 15}}>
      <Text style={styles.title}>{`Tầng: ${floor}`}</Text>
      {room.map((item, index) => {
        return (
          <View key={`${item?.room}`} style={styles.viewRender}>
            <View style={styles.viewBetween}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={icons.ic_home}
                  style={{width: 20, height: 20, tintColor: colors.mainColor}}
                />
                <Text style={styles.labelRoom}>{`${item?.room}`}</Text>
              </View>
              <CustomButton
                disabled={true}
                styleButton={styles.statusView}
                label={item?.status ? 'Đã chốt' : 'Chưa chốt'}
                styleLabel={{fontSize: 12, color: 'white'}}
              />
            </View>

            <Text
              numberOfLines={1}
              style={styles.content}>{`${item?.value}`}</Text>
            <View style={styles.viewBetween}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[styles.label]}>{`Người gửi: `}</Text>
                <Text
                  numberOfLines={1}
                  style={[
                    {fontWeight: '600'},
                    styles.label,
                  ]}>{`${item?.name}`}</Text>
              </View>
              <CustomButton
                styleButton={styles.buttonConfirm}
                label={'Xác nhận'}
                styleLabel={{fontSize: 13, color: 'white'}}
                onPress={() => onPress(item)}
              />
            </View>
          </View>
        );
      })}
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
    alignItems: 'center',
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
