import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, View} from 'react-native';
import {colors, icons} from '../../../Constants';
import CustomButton from '../../CommonComponent/CustomButton';
import CustomInput from '../../CommonComponent/CustomInput';
const CustomModalAddOtherFee = props => {
  const {modalVisible, onRequestClose, pressClose, pressConfirm} = props;
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [fee, setFee] = useState('');
  const isDataReady = () => name != '' && quantity != '' && fee != '';
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onRequestClose}>
        <View style={styles.eachContainer}>
          <CustomButton
            styleButton={styles.buttonClose}
            icon={icons.ic_close}
            styleIcon={styles.iconClose}
            onPress={pressClose}
          />
          <CustomInput
            important={true}
            styleViewInput={{marginTop: 40}}
            type={'input'}
            title={'Tiêu đề'}
            placeholder={'Nhập tiêu đề'}
            defaultValue={name}
            onEndEditing={evt => setName(evt.nativeEvent.text)}
          />
          <CustomInput
            important={true}
            styleViewInput={{marginTop: 10}}
            type={'input'}
            keyboardType={'numeric'}
            title={'Số lượng'}
            placeholder={'Nhập số lượng'}
            defaultValue={quantity}
            onEndEditing={evt => setQuantity(evt.nativeEvent.text)}
          />
          <CustomInput
            important={true}
            styleViewInput={{marginTop: 10}}
            type={'input'}
            keyboardType={'numeric'}
            title={'Đơn giá'}
            placeholder={'Nhập đơn giá'}
            defaultValue={fee}
            onEndEditing={evt => setFee(evt.nativeEvent.text)}
          />

          <CustomButton
            label={'Xác nhận'}
            styleButton={styles.buttonConfirm}
            styleLabel={styles.labelConfirm}
            onPress={() => {
              const otherFee = {
                name: name,
                quantity: quantity,
                fee: fee,
              };
              if (isDataReady()) {
                pressConfirm(otherFee);
              } else {
                Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin');
              }
            }}
          />
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(1,1,1,0.5)',
    zIndex: 1,
  },
  eachContainer: {
    height: '80%',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 10,
  },
  buttonClose: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: colors.mainColor,
    position: 'absolute',
    top: 8,
    right: 8,
  },
  iconClose: {tintColor: 'white', width: 15, height: 15},
  buttonConfirm: {
    backgroundColor: colors.mainColor,
    height: 48,
    width: 150,
    alignSelf: 'center',
    borderRadius: 8,
    marginTop: 50,
  },
  labelConfirm: {color: 'white', fontWeight: 'bold'},
});
export default CustomModalAddOtherFee;
