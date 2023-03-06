import React from 'react';
import {Modal, View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {colors, icons} from '../Constants';
import CustomButton from './CustomButton';

const CustomLoading = props => {
  const {modalVisible, onRequestClose, pressBack} = props;
  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onRequestClose}>
        <View style={styles.eachContainer}>
          {pressBack && (
            <CustomButton
              onPress={pressBack}
              icon={icons.ic_back}
              styleIcon={styles.icon}
              styleButton={styles.button}
            />
          )}
          <Text style={styles.textLoading}>Loading</Text>
          <ActivityIndicator color={'white'} size={60} />
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  eachContainer: {
    flex: 1,
    backgroundColor: 'rgba(1,1,1,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLoading: {
    fontSize: 28,
    color: 'white',
    fontFamily: 'sf-pro-text-semibold',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  button: {position: 'absolute', top: 15, left: 10},
});
export default CustomLoading;
