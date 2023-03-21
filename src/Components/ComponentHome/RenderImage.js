import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {colors, icons} from '../../Constants';
import CustomButton from '../CommonComponent/CustomButton';
const RenderImage = props => {
  const {data, deleteItem, deleteButton} = props;
  return (
    <View>
      <View style={styles.viewRender}>
        {deleteButton && (
          <CustomButton
            onPress={deleteItem}
            styleButton={styles.customButtonIcon}
            styleIcon={styles.imageStyle}
            icon={icons.ic_cancel}
          />
        )}
        <Image
          source={
            data?.uri
              ? {uri: data?.uri}
              : data?.fileUrl
              ? {uri: data?.fileUrl}
              : null
          }
          style={styles.image}
          resizeMode={'contain'}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  image: {width: 180, height: 180, marginHorizontal: 5},
  imageStyle: {width: 20, height: 20},
  viewRender: {
    height: 210,
    width: 210,
    borderWidth: 0.5,
    borderColor: colors.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 10,
  },
  customButtonIcon: {position: 'absolute', right: 3, top: 3, zIndex: 1},
});
export default RenderImage;
