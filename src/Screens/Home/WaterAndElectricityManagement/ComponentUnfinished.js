import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import CustomButton from '../../../Components/CommonComponent/CustomButton';
import {colors, icons} from '../../../Constants';
const FACE_DATA = [
  {
    floor: 1,
    room: [
      {
        room: 'P101',
        status: false,
        value: 'Điện: 12KWH | Nước: 13 Khối',
        name: 'Đức Thắng',
      },
      {
        room: 'P102',
        status: false,
        value: 'Điện: 12KWH | Nước: 13 Khối',
        name: 'Đức Thắng',
      },
      {
        room: 'P103',
        status: false,
        value: 'Điện: 12KWH | Nước: 13 Khối',
        name: 'Đức Thắng',
      },
    ],
  },
  {
    floor: 2,
    room: [
      {
        room: 'P201',
        status: false,
        value: 'Điện: 12KWH  Nước: 13 Khối',
        name: 'Đức Thắng',
      },
      {
        room: 'P202',
        status: false,
        value: 'Điện: 12KWH | Nước: 13 Khối',
        name: 'Đức Thắng',
      },
      {
        room: 'P203',
        status: false,
        value: 'Điện: 12KWH | Nước: 13 Khối',
        name: 'Đức Thắng',
      },
    ],
  },
];
const ComponentUnfinished = () => {
  const [data, setData] = useState(FACE_DATA);
  const navigation = useNavigation();

  const renderItem = (itemFloor, index) => {
    return (
      <View style={{marginBottom: 15}}>
        <Text style={styles.title}>{`Tầng: ${itemFloor?.floor}`}</Text>
        {itemFloor?.room.map((item, index) => {
          return (
            <View key={`${item?.room}`} style={styles.viewRender}>
              <View style={{width: '60%'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={icons.ic_home}
                    style={{width: 20, height: 20, tintColor: colors.mainColor}}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#97A1A7',
                      marginLeft: 5,
                      flex: 1,
                    }}>{`${item?.room}`}</Text>
                </View>
                <Text style={styles.content}>{item?.value}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={[styles.label]}>{`Người gửi: `}</Text>
                  <Text
                    style={[
                      {fontWeight: '600'},
                      styles.label,
                    ]}>{`${item?.name}`}</Text>
                </View>
              </View>
              <View style={{alignItems: 'center'}}>
                <CustomButton
                  disabled={true}
                  styleButton={styles.statusView}
                  label={item?.status ? 'Đã chốt' : 'Chưa chốt'}
                  styleLabel={{fontSize: 12, color: 'white'}}
                />
                <CustomButton
                  styleButton={{
                    height: 40,
                    width: 120,
                    backgroundColor: colors.mainColor,
                    borderRadius: 5,
                  }}
                  label={'Xác nhận'}
                  styleLabel={{fontSize: 13, color: 'white'}}
                  onPress={() => {
                    navigation.navigate(
                      'WaterAndElectricityInfor',
                      item?.floor,
                    );
                  }}
                />
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={{flex: 1, paddingHorizontal: 10}}>
      <FlatList
        data={data}
        keyExtractor={key => `${key?.floor}`}
        renderItem={({item, index}) => renderItem(item, index)}
      />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 5,
  },
  title: {fontSize: 16, fontWeight: '600', color: '#163A5F'},
  label: {fontSize: 12, color: colors.mainColor},
  content: {fontSize: 13, fontWeight: '600', color: '#374047'},
  statusView: {
    height: 25,
    paddingHorizontal: 5,
    backgroundColor: colors.backgroundOrange,
    borderRadius: 4,
    marginBottom: 15,
    width: 100,
  },
});
export default ComponentUnfinished;
