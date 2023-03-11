import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {colors} from '../../Constants';
const CustomNote = props => {
  const {placeholder, value, onChangeText, title} = props;
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.viewInput}>
        <TextInput
          multiline
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  title: {color: 'rgba(55, 64, 71, 1)', fontSize: 15, marginBottom: 5},
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
