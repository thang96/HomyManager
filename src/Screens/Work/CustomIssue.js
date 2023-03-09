import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import CustomButtonValue from '../../Components/CustomButtonValue';
import CustomTextTitle from '../../Components/CustomTextTitle';
import {icons} from '../../Constants';

const CustomIssue = props => {
  const [data, setData] = useState(FAKE_DATE);

  const renderItemIssue = (item, index) => {
    return (
      <View style={styles.viewRender}>
        <View style={{flexDirection: 'row', width: '60%'}}>
          <View style={styles.lineOrange} />
          <View>
            <Text style={styles.label}>{'Sự cố'}</Text>
            <Text style={styles.content}>{item?.content}</Text>
            <Text style={styles.label}>{item?.place}</Text>
          </View>
        </View>
        <View>
          <Text style={[styles.label]}>{item?.time}</Text>
          <Text
            style={[{marginTop: 15}, styles.label]}>{`Từ: ${item?.name}`}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <CustomButtonValue
        type={'button'}
        icon={icons.ic_businessBuilding}
        placeholder={'Chọn tòa nhà'}
        value={'Tòa nhà D2'}
      />
      <CustomTextTitle label={'Danh sách sự cố'} labelButton={'Sắp xếp'} />
      <View style={{flex: 1, marginTop: 20}}>
        <FlatList
          data={data}
          keyExtractor={key => `${key?.id}`}
          renderItem={({item, index}) => renderItemIssue(item, index)}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  viewRender: {
    backgroundColor: '#fff3e9',
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
    marginBottom: 15,
  },
  label: {color: '#5F6E78', fontSize: 12, fontWeight: '400'},
  lineOrange: {
    width: 5,
    height: 20,
    backgroundColor: '#FF8D37',
    borderRadius: 5,
    alignSelf: 'center',
    marginRight: 10,
  },
  content: {fontSize: 15, fontWeight: '600', color: '#374047'},
});
export default CustomIssue;

const FAKE_DATE = [
  {
    title: 'Sự cố',
    time: '14:00 01-02-2023',
    content: 'Cháy dây điện âm trong tường làm hỏng tường nhà',
    place: 'Tòa nhà D2 - Tầng 1 - P101',
    name: 'Đức Thắng',
    id: 1,
  },
  {
    title: 'Sự cố',
    time: '14:00 01-02-2023',
    content: 'Cháy bóng điện nhà tắm',
    place: 'Tòa nhà D2 - Tầng 1 - P101',
    name: 'Đức Thắng',
    id: 2,
  },
  {
    title: 'Sự cố',
    time: '14:00 01-02-2023',
    content: 'Cháy bóng điện nhà tắm',
    place: 'Tòa nhà D2 - Tầng 1 - P101',
    name: 'Đức Thắng',
    id: 3,
  },
  {
    title: 'Sự cố',
    time: '14:00 01-02-2023',
    content: 'Cháy bóng điện nhà tắm',
    place: 'Tòa nhà D2 - Tầng 1 - P101',
    name: 'Đức Thắng',
    id: 4,
  },
  {
    title: 'Sự cố',
    time: '14:00 01-02-2023',
    content: 'Cháy bóng điện nhà tắm',
    place: 'Tòa nhà D2 - Tầng 1 - P101',
    name: 'Đức Thắng',
    id: 5,
  },
];
