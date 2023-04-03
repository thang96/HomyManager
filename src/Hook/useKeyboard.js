import React, {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

const useKeyboard = () => {
  const [keyboard, setKeyboard] = useState(false);
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboard(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboard(false);
    });
  }, []);
  return keyboard;
};
export default useKeyboard;
