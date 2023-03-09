import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import CustomButtonValue from '../../Components/CustomButtonValue';
import CustomTextTitle from '../../Components/CustomTextTitle';
import {icons} from '../../Constants';

const CustomContract = props => {
  const [data, setData] = useState([]);

  return (
    <View style={{flex: 1}}>
      <CustomButtonValue
        type={'button'}
        icon={icons.ic_businessBuilding}
        placeholder={'Chọn tòa nhà'}
        value={'Tòa nhà D2'}
      />
      <CustomTextTitle label={'Danh sách hợp đồng'} labelButton={'Sắp xếp'} />
      <View style={{flex: 1, marginTop: 20}}>
        <FlatList data={data} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({});
export default CustomContract;
