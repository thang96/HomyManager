import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {icons, colors} from '../../../Constants';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import RenderContract from '../../../Components/ComponentHome/RenderContract';
import {convertDate} from '../../../utils/common';

const CustomIsActive = props => {
  const {data, onPress, pressEdit} = props;

  const renderContract = (item, index) => {
    return (
      <RenderContract
        description={item?.description}
        startDate={`${convertDate(item?.startDate)}`}
        endDate={`${convertDate(item?.endDate)}`}
        houseName={`${item?.unit?.house?.name}`}
        unitName={`${item?.unit?.name}`}
        contractOwner={`${item?.contractOwner?.fullName}`}
        onPress={() => onPress(item)}
        pressEdit={() => pressEdit(item)}
      />
    );
  };
  return (
    <View style={styles.container}>
      <CustomTextTitle label={'Hợp đồng đang hoạt động'} />
      <FlatList
        data={data}
        keyExtractor={key => key.id}
        renderItem={({item, index}) => renderContract(item, index)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
});
export default CustomIsActive;
