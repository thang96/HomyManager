import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {colors} from '../../Constants';
const CustomNote = props => {
  const {
    placeholder,
    defaultValue,
    onEndEditing,
    title,
    important,
    viewCustom,
  } = props;
  return (
    <View style={[styles.container, viewCustom]}>
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 3}}>
        <Text style={styles.title}>{title}</Text>
        {important && <Text style={{color: 'red', fontSize: 14}}> *</Text>}
      </View>
      <View style={styles.viewInput}>
        <TextInput
          multiline
          placeholder={placeholder}
          defaultValue={defaultValue}
          onEndEditing={onEndEditing}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  title: {fontSize: 15, color: '#374047'},
  viewInput: {
    backgroundColor: 'white',
    height: 120,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.borderInput,
  },
  shadowView: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 1,
  },
});
export default CustomNote;
