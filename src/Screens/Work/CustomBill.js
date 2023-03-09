import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import CustomButtonValue from '../../Components/CustomButtonValue';
import CustomTextTitle from '../../Components/CustomTextTitle';
import {icons} from '../../Constants';

const CustomBill = props => {
  const [data, setData] = useState([]);

  const renderItemBill = (item, index) => {
    return <View style={styles.viewRender}></View>;
  };

  return (
    <View style={{flex: 1}}>
      <CustomButtonValue
        type={'button'}
        icon={icons.ic_businessBuilding}
        placeholder={'Chọn tòa nhà'}
        value={'Tòa nhà D2'}
      />
      <CustomTextTitle label={'Danh sách hóa đơn'} labelButton={'Sắp xếp'} />
      <View style={{flex: 1, marginTop: 20}}>
        <FlatList
          data={data}
          keyExtractor={key => `${key?.id}`}
          renderItem={({item, index}) => renderItemBill(item, index)}
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
});
export default CustomBill;
