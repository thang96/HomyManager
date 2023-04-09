import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import CustomButton from '../../../Components/CommonComponent/CustomButton';
import {colors, icons} from '../../../Constants';
import RenderWaterElectricity from './RenderWaterElectricity';

const ComponentUnfinished = props => {
  const {data, onPress} = props;
  const navigation = useNavigation();

  const renderItem = (item, index) => {
    return (
      <RenderWaterElectricity
        value={item?.value}
        floor={item?.floor}
        room={item?.room}
        name={item?.name}
        onPress={() => onPress(item)}
      />
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
const styles = StyleSheet.create({});
export default ComponentUnfinished;
